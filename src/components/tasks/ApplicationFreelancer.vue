<template>
  <div v-if="application">
    <div class="row">
      <div class="col-12">
        <single-task-title :task="task" :client="application.client" class="mb-3 mb-lg-5">
          <template slot="title">
            <application-status-badge :application="application" class="ml-3"/>
          </template>
        </single-task-title>
      </div>
    </div>
    <div class="row">
      <div class="d-none d-lg-block col-lg-3 offset-lg-1 order-lg-2 pb-4">
        <task-details :task="task">
          <template slot="buttons">
            <freelancer-task-buttons :application="application"
                                     @feedback="saveFeedback"
                                     @apply="apply"/>
          </template>
        </task-details>
        <required-skills class="skills p-4 m-2" :skills="task.skills" v-if="task.skills"/>
      </div>
      <div class="col-12 col-lg-7 order-lg-1">
        <b-tabs :value="selectedTab" @input="selectTab">
          <b-tab title="Project details" class="py-4">
            <task-details :task="task" :applicable="false" class="d-lg-none mb-4"/>
            {{task.description}}
          </b-tab>
          <b-tab title="Messages">
            <chat-container :task="task" :application="application"/>
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TaskDetails from './TaskDetails.vue';
import RequiredSkills from './RequiredSkills.vue';
import ChatContainer from './chat/ChatContainer.vue';
import SingleTaskTitle from './SingleTaskTitle.vue';
import ApplicationStatusBadge from './ApplicationStatusBadge.vue';
import FreelancerTaskButtons from './FreelancerTaskButtons.vue';
import ApiService from '../../services/api.service';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ApplicationFreelancer',
  components: {
    FreelancerTaskButtons,
    ApplicationStatusBadge,
    SingleTaskTitle,
    ChatContainer,
    RequiredSkills,
    TaskDetails,
  },
  computed: {
    ...mapState('tasks', {
      application: state => state.selectedApplication,
    }),
    task() {
      return this.application && this.application.task ? this.application.task : {};
    },
    selectedTab() {
      return this.$store.state.ui.taskSelectedTab;
    },
  },
  methods: {
    /**
     * Get application data for id
     */
    getData(val) {
      const id = parseInt(val, 10);

      // get application data
      this.$store.dispatch('tasks/getApplication', id);

      // set messages as read for this application
      this.$store.dispatch('chat/readMessages', id);
    },

    /**
     * Fired when tab is changed
     * @param tabId
     */
    selectTab(tabId) {
      this.$store.commit('ui/setTaskSelectedTab', tabId);
    },

    async apply(letter) {
      try {
        const application = await this.$store.dispatch('tasks/applyForTask', {
          taskId: this.task.id,
          letter,
        });
        // add new thread from new application
        this.$store.commit('chat/addThread', application);

        // emit to socket that freelancer applied to task
        this.$socket.emit('applied', application);

        // show toast
        await this.$store.dispatch('ui/showNotification', {
          type: 'success',
          text: 'You applied for this task',
        });
        this.applied = true;
        this.letter = null;
      } catch (err) {
        await this.$store.dispatch('ui/showNotification', {
          type: 'danger',
          text: err.response.data.message,
        });
      }
    },

    /**
     * Save feedback data
     */
    async saveFeedback({ formData, status }) {
      try {
        const data = Object.assign({}, formData, {
          applicationId: this.application.id,
          status,
        });
        const res = await ApiService.post('/feedbacks', data);
        this.$store.commit('tasks/setFreelancerApplicationFeedback', res.data.data);
        this.$store.commit('tasks/setFreelancerApplicationStatus', status);

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
  },
  /**
   * Watch for $route.params.id change and get data for new id
   */
  watch: {
    '$route.params.id': function (n) {
      // get data for new id
      this.getData(n);
    },
  },
  created() {
    this.getData(this.$route.params.id);
  },
  destroyed() {
    // deselect application
    this.$store.commit('tasks/setSelectedApplication', null);
    this.$store.commit('ui/setTaskSelectedTab', 0);
  },
};
</script>
