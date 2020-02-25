<template>
  <div>
    <div class="row">
      <div class="col-12">
        <single-task-title :task="task"/>
      </div>
    </div>
    <div class="row">
      <div class="d-none d-lg-block col-lg-3 offset-lg-1 order-lg-2">
        <task-details :task="task" :applicable="false"/>
        <required-skills class="p-4 m-2" :skills="task.skills" v-if="task.skills"/>
      </div>
      <div class="col-12 col-lg-7 order-lg-1">
        <b-tabs :value="selectedTab" nav-class="my-task-tabs" @input="selectTab">
          <b-tab title="Description" class="py-4">
            <task-details :task="task" :applicable="false" class="d-lg-none mb-4"/>
            <task-description :description="task.description"/>
          </b-tab>
          <b-tab title="Freelancers" class="pt-3">
            <div v-if="task.applications">
              <applied-freelancer :application="a"
                                  :task="task"
                                  class="mb-5"
                                  :key="i"
                                  v-for="(a, i) in task.applications"
                                  @select="goToMessages"
                                  @hire="hire"
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
            <client-threads :task-id="task.id" class="pt-3" @select="goToMessages"/>
          </b-tab>
          <b-tab v-if="selectedApplication" :title="selectedFreelancerName">
            <chat-container :task="task"
                            :application="selectedApplication"/>
          </b-tab>
        </b-tabs>
      </div>
    </div>

    <feedback-modal @save="saveFeedback"/>
  </div>
</template>

<script>
import { get } from 'lodash';
import { mapState } from 'vuex';
import TaskDetails from '../../components/tasks/TaskDetails.vue';
import RequiredSkills from '../../components/tasks/RequiredSkills.vue';
import AppliedFreelancer from '../../components/tasks/AppliedFreelancer.vue';
import ChatContainer from '../../components/tasks/chat/ChatContainer.vue';
import SingleTaskTitle from '../../components/tasks/SingleTaskTitle.vue';
import ClientThreads from '../../components/tasks/chat/ClientThreads.vue';
import FeedbackModal from '../../components/feedback/FeedbackModal.vue';
import ApiService from '../../services/api.service';
import TaskDescription from '../../components/tasks/TaskDescription.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'MyTask',
  components: {
    TaskDescription,
    FeedbackModal,
    ClientThreads,
    SingleTaskTitle,
    ChatContainer,
    AppliedFreelancer,
    RequiredSkills,
    TaskDetails,
  },
  data() {
    return {
      application: null,
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
        await this.$store.dispatch('tasks/hire', application);

        this.$store.dispatch('ui/showNotification', {
          type: 'success',
          text: 'Freelancer successfully hired',
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
    openFeedbackModal(application) {
      this.application = application;
      this.$store.commit('tasks/openFeedbackModal');
    },

    /**
     * Save feedback data
     * @param {Object} formData
     */
    async saveFeedback(formData) {
      const status = 2;

      try {
        const data = Object.assign({}, formData, {
          applicationId: this.application.id,
          status,
        });
        const res = await ApiService.post('/feedbacks', data);
        this.$store.commit('tasks/setClientApplicationFeedback', res.data.data);
        this.$store.commit('tasks/setClientApplicationStatus', status);

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
