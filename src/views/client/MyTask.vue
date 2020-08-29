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
            <close-task-button :task="task" @close="close"/>
          </template>
        </task-details>
        <required-skills class="p-4 m-2" :skills="task.skills" v-if="task.skills"/>
      </div>
      <div class="col-12 col-lg-7 order-lg-1">
        <b-tabs :value="selectedTab" nav-class="my-task-tabs" @input="selectTab">
          <b-tab :title="$t('common.description')" class="py-4">
            <template v-slot:title>
              <span class="nav-link__title">{{$t('common.description')}}</span>
              <clipboard-icon class="nav-link__icon" size="1.5x"></clipboard-icon>
            </template>
              <task-details :task="task" :applicable="false" class="d-lg-none mb-4"/>
              <task-description :description="task.description"/>
          </b-tab>
          <b-tab :title="$t('common.freelancers')" class="pt-3">
            <template v-slot:title>
              <span class="nav-link__title">{{$t('common.freelancers')}}</span>
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
                {{$t('applications.no_applications')}}
              </div>
              <language-router-link to="/freelancers"><u>
                {{$t('tasks.details.browse_freelancers')}}
              </u></language-router-link>
            </div>
          </b-tab>
          <b-tab :title="$t('applications.messages')">
            <template v-slot:title>
              <span class="nav-link__title">{{$t('applications.messages')}}</span>
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
                                          :reply-enabled="false"
                                          @hire="openHireModal(selectedApplication)"
                                          @feedback="mapDataAndOpenFeedbackModal($event)"/>
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
                  <b-button>{{$t('common.cancel')}}</b-button>
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
import CloseTaskButton from '../../components/client/CloseTaskButton.vue';
import ClientApplicationButtons from '../../components/tasks/ClientApplicationButtons.vue';
import ConfirmHireModal from '../../components/client/ConfirmHireModal.vue';
import LanguageRouterLink from '../../components/ui/LanguageRouterLink.vue';
import apiService from '../../services/api.service';
import smartContract from '../../services/smartContract.service';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'MyTask',
  components: {
    LanguageRouterLink,
    ConfirmHireModal,
    ReopenTaskButton,
    CloseTaskButton,
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
     * Close task to applications
     */
    async close() {
      try {
        await this.$store.dispatch('tasks/close', this.task);
        await this.$store.dispatch('ui/showNotification', {
          type: 'success',
          text: 'Task is closed to applications',
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
          feedback: res.data.data.feedback,
          applicationId: this.application.id,
        });
        this.$store.commit('tasks/setClientApplicationStatus', {
          status: res.data.data.application.status,
          applicationId: this.application.id,
        });

        this.$store.dispatch('ui/showNotification', {
          type: 'success',
          text: 'Application completed and feedback saved successfully',
        });

        this.$store.commit('tasks/closeFeedbackModal');


        const taskRes = await ApiService.get(`/tasks/${this.application.taskId}`);
        const flancerRes = await ApiService.get(`/freelancers/${this.application.freelancerId}`);
        const taskBcId = taskRes.data.data.bcId;
        const flancerBcId = flancerRes.data.data.bcId;
        try {
          console.log('formData rate and message:');
          console.log(formData.rate);
          console.log(formData.message);

          console.log(`Application status: ${res.data.data.application.status}`);
          if (res.data.data.application.status === 2) {
            smartContract.setFinalizeProperties(res.data.data.feedback.id, taskBcId, flancerBcId, formData.rate, formData.message).then(async (res) => {
              const resBc = await apiService.put('/feedbacks/regBcFinalize', res);
              console.log(res);
              console.log(resBc.data.message);
            });
          } if (res.data.data.application.status === 4) {
            console.log(`Application status: ${res.data.data.application.status}`);
          } else {
            console.log(`Application status: ${res.data.data.application.status}`);
          }
        } catch (e) {
          console.log(e);
        }
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

    /**
     * Map data and open feedback modal
     * @param statusValue
     */
    mapDataAndOpenFeedbackModal(statusValue) {
      const payload = { application: this.selectedApplication, status: statusValue };
      this.openFeedbackModal(payload);
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
