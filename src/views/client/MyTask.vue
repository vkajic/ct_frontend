<template>
  <div>
    <div class="row">
      <div class="col-12 col-lg-7">
        <single-task-title :task="task"/>
      </div>
    </div>
    <div class="row">
      <div class="d-none d-lg-block col-lg-4 col-xl-3 offset-xl-1 order-lg-2">
        <task-details :task="task" :applicable="false">
          <template slot="buttons">
            <reopen-task-button :task="task" @reopen="reopen"/>
          </template>
        </task-details>
        <required-skills class="p-4 m-2" :skills="task.skills" v-if="task.skills"/>
      </div>
      <div class="col-12 col-lg-7 order-lg-1">
        <b-tabs :value="selectedTab" nav-class="my-task-tabs" @input="selectTab">
          <b-tab title="Description" class="py-4">
            <template v-slot:title>
              <span class="nav-link__title">Description</span>
              <clipboard-icon class="nav-link__icon" size="1.5x"></clipboard-icon>
            </template>
              <task-details :task="task" :applicable="false" class="d-lg-none mb-4"/>
              <task-description :description="task.description"/>
          </b-tab>
          <b-tab title="Freelancers" class="pt-3">
            <template v-slot:title>
              <span class="nav-link__title">Freelancers</span>
              <users-icon class="nav-link__icon" size="1.5x"></users-icon>
            </template>
            <div v-if="task.applications">
              <applied-freelancer :application="a"
                                  :task="task"
                                  class="mb-5"
                                  :key="i"
                                  v-for="(a, i) in task.applications"
                                  @select="goToMessages"
                                  @hire="openHireModal(a)"
                                  @feedback="openFeedbackModal"/>
            </div>
            <div v-if="!task.applications || !task.applications.length">
              <div class="h1 mb-4">
                You have no applications for this task atm...
              </div>
              <router-link to="/freelancers"><u>Browse freelancers</u></router-link>
            </div>
          </b-tab>
          <b-tab title="Messages">
            <template v-slot:title>
              <span class="nav-link__title">Messages</span>
              <message-circle-icon class="nav-link__icon" size="1.5x"></message-circle-icon>
            </template>
            <client-threads :task-id="task.id" class="pt-3" @select="goToMessages"/>
          </b-tab>
          <b-tab v-if="selectedApplication" :title="truncatedFreelancerName">
            <chat-container :task="task"
                            :application="selectedApplication"/>
          </b-tab>
          <template v-if="selectedApplication" v-slot:tabs-end>
            <div class="my-task-tabs__wrapper">
              <client-application-buttons class="my-task-tabs__action-btn"
                                          :application="selectedApplication"
                                          :replyEnabled="false"
                                          @hire="openHireModal(selectedApplication)"
                                          @feedback="openFeedbackModal(selectedApplication)"/>
              <b-dropdown class="my-task-tabs__actions-dropdown"
                          id="dropdown-dropup"
                          boundary="viewport"
                          size="sm"
                          no-flip
                          variant="link"
                          toggle-class="text-decoration-none"
                          no-caret>
                  <template v-slot:button-content>
                     <chevron-down-icon size="1x"></chevron-down-icon>
                  </template>
                <b-dropdown-item>
                  <b-button>Cancel</b-button>
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </template>
        </b-tabs>
      </div>
    </div>
    <confirm-hire-modal v-if="application"
                        :application="application"
                        :task="task"
                        @close="closeHireModal"
                        @hire="hire"
                        :is-visible="isHireModalVisible"/>
    <feedback-modal @save="saveFeedback"/>
  </div>
</template>

<script>
import { get, truncate } from 'lodash';
import { mapState } from 'vuex';
import {
  ChevronDownIcon, UsersIcon, MessageCircleIcon, ClipboardIcon,
} from 'vue-feather-icons';
import TaskDetails from '../../components/tasks/TaskDetails.vue';
import RequiredSkills from '../../components/tasks/RequiredSkills.vue';
import AppliedFreelancer from '../../components/tasks/AppliedFreelancer.vue';
import ChatContainer from '../../components/tasks/chat/ChatContainer.vue';
import SingleTaskTitle from '../../components/tasks/SingleTaskTitle.vue';
import ClientThreads from '../../components/tasks/chat/ClientThreads.vue';
import FeedbackModal from '../../components/feedback/FeedbackModal.vue';
import ApiService from '../../services/api.service';
import TaskDescription from '../../components/tasks/TaskDescription.vue';
import ReopenTaskButton from '../../components/client/ReopenTaskButton.vue';
import ClientApplicationButtons from '../../components/tasks/ClientApplicationButtons.vue';
import ConfirmHireModal from '../../components/client/ConfirmHireModal.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'MyTask',
  components: {
    ConfirmHireModal,
    ReopenTaskButton,
    TaskDescription,
    FeedbackModal,
    ClientThreads,
    SingleTaskTitle,
    ChatContainer,
    AppliedFreelancer,
    RequiredSkills,
    TaskDetails,
    ChevronDownIcon,
    UsersIcon,
    MessageCircleIcon,
    ClipboardIcon,
    ClientApplicationButtons,
  },
  data() {
    return {
      application: null,
      isHireModalVisible: false,
    };
  },
  computed: {
    ...mapState('tasks', {
      task: state => state.selectedTask || {},
      selectedApplication: state => state.selectedApplication,
    }),

    /**
     * Selected tab
     */
    selectedTab() {
      return this.$store.state.ui.taskSelectedTab;
    },

    /**
     * Freelancer name for selected application
     */
    selectedFreelancerName() {
      return this.selectedApplication
        ? get(this, 'selectedApplication.freelancer.name', '')
        : '';
    },
    /**
     * Truncate freelancer name
     */
    truncatedFreelancerName() {
      return truncate(this.selectedFreelancerName, { length: 15 });
    },
  },
  methods: {
    /**
     * Change tab to messages
     */
    async goToMessages(application) {
      // get application data
      await this.$store.dispatch('tasks/getApplication', application.id);

      // set messages as read for this application
      await this.$store.dispatch('chat/readMessages', application.id);

      this.$store.commit('ui/setTaskSelectedTab', 3);
    },

    /**
     * Hire freelancer
     */
    async hire(application) {
      try {
        this.closeHireModal();
        await this.$store.dispatch('tasks/hire', application);

        this.$store.dispatch('ui/showNotification', {
          type: 'success',
          text: 'Freelancer successfully hired',
        });
        this.resetSelectedApplication();
      } catch (err) {
        this.$store.dispatch('ui/showNotification', {
          type: 'danger',
          text: 'Something went wrong',
        });
      }
    },

    /**
     * Reopen task again
     */
    async reopen() {
      try {
        await this.$store.dispatch('tasks/reopen', this.task);
        await this.$store.dispatch('ui/showNotification', {
          type: 'success',
          text: 'Task is accepting applications again',
        });
      } catch (err) {
        this.$store.dispatch('ui/showNotification', {
          type: 'danger',
          text: 'Something went wrong',
        });
      }
    },

    /**
     * Open feedback modal
     */
    openFeedbackModal({ application, status }) {
      this.application = application;
      this.$store.commit('tasks/openFeedbackModal', {
        applicationId: this.application.id,
        status,
      });
    },

    /**
     * Open hire modal
     * @param {Object} application
     */
    openHireModal(application) {
      this.application = application;
      this.isHireModalVisible = true;
    },

    /**
     * Close hire modal
     */
    closeHireModal() {
      this.isHireModalVisible = false;
    },

    /**
     * Save feedback data
     * @param {Object} formData
     */
    async saveFeedback(formData) {
      try {
        const res = await ApiService.post('/feedbacks', formData);
        this.$store.commit('tasks/setClientApplicationFeedback', {
          feedback: res.data.data,
          applicationId: this.application.id,
        });
        this.$store.commit('tasks/setClientApplicationStatus', {
          status: formData.status,
          applicationId: this.application.id,
        });

        this.$store.dispatch('ui/showNotification', {
          type: 'success',
          text: 'Application completed and feedback saved successfully',
        });

        this.$store.commit('tasks/closeFeedbackModal');
      } catch (err) {
        console.error(err);
        this.$store.dispatch('ui/showNotification', {
          type: 'danger',
          text: `${err.response.data.message}`,
        });
      }
    },

    /**
     * Get application data for id
     */
    async getData(val) {
      const id = parseInt(val, 10);

      // get task data
      await this.$store.dispatch('tasks/selectTask', id);
    },

    /**
     * Fired when tab is changed
     * @param tabId
     */
    selectTab(tabId) {
      this.$store.commit('ui/setTaskSelectedTab', tabId);
    },

    /**
     * Set selected application to default value
     */
    resetSelectedApplication() {
      this.$store.commit('tasks/setSelectedApplication', null);
    },

  },
  created() {
    this.getData(this.$route.params.id)
      .then(() => {
        if (this.selectedTab === 3) {
          // scroll to chat tab
          const content = document.querySelector('.nav-tabs');
          if (content) {
            content.scrollLeft += 200;
          }
        }
      });
  },
  watch: {
    // eslint-disable-next-line func-names
    '$route.params.id': function (id) {
      this.getData(id);
    },

    selectedTab(tabId) {
      if (tabId === 3) {
        // scroll to chat tab
        const content = document.querySelector('.nav-tabs');
        content.scrollLeft += 200;
      }
    },
  },
  destroyed() {
    // deselect application and task
    this.$store.commit('tasks/setSelectedTask', null);
    this.$store.commit('tasks/setSelectedApplication', null);
    this.$store.commit('ui/setTaskSelectedTab', 0);
  },
};
</script>
