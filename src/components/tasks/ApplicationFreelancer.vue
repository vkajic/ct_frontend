<template>
  <div v-if="application">
    <div class="row">
      <div class="col-12 col-lg-7">
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
                                     @feedback="saveFeedback"/>
          </template>
        </task-details>
        <required-skills class="skills p-4 m-2" :skills="task.skills" v-if="task.skills"/>
      </div>
      <div class="col-12 col-lg-7 order-lg-1">
        <b-tabs class="application-freelancer-tabs" nav-class="align-items-center"
                :value="selectedTab" @input="selectTab">
          <b-tab :title="$t('freelancers.project_details')" class="py-4">
            <template v-slot:title>
              <span class="nav-link__title d-none d-xxl-block">
                {{ $t('freelancers.description') }}
              </span>
              <clipboard-icon class="nav-link__icon d-xxl-none" size="1.5x"/>
            </template>
            <task-details :task="task" :applicable="false" class="d-lg-none mb-4"/>
            <task-description :description="task.description"/>
          </b-tab>
          <b-tab :title="$t('freelancers.messages')">
            <template v-slot:title>
              <span class="nav-link__title d-none d-xxl-block">
                {{ $t('freelancers.messages') }}
              </span>
              <message-circle-icon class="nav-link__icon d-xxl-none" size="1.5x"/>
            </template>
            <chat-container :task="task" :application="application"/>
          </b-tab>
          <template v-if="showActionsDropdown" v-slot:tabs-end>
            <freelancer-application-dropdown :application="application"/>
          </template>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { MessageCircleIcon, ClipboardIcon } from 'vue-feather-icons';
import FreelancerApplicationDropdown from '@/components/tasks/FreelancerApplicationDropdown.vue';
import TaskDetails from './TaskDetails.vue';
import RequiredSkills from './RequiredSkills.vue';
import ChatContainer from './chat/ChatContainer.vue';
import SingleTaskTitle from './SingleTaskTitle.vue';
import ApplicationStatusBadge from './ApplicationStatusBadge.vue';
import FreelancerTaskButtons from './FreelancerTaskButtons.vue';
import ApiService from '../../services/api.service';
import TaskDescription from './TaskDescription.vue';
import smartContract from '../../services/smartContract.service';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ApplicationFreelancer',
  components: {
    FreelancerApplicationDropdown,
    TaskDescription,
    FreelancerTaskButtons,
    ApplicationStatusBadge,
    SingleTaskTitle,
    ChatContainer,
    RequiredSkills,
    TaskDetails,
    MessageCircleIcon,
    ClipboardIcon,
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
    showActionsDropdown() {
      const { status, feedback } = this.application;
      if (status === 1) return true;
      if (status === 2 || status === 4) return !feedback.freelancerFeedback;
      return false;
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

    /**
     * Save feedback data
     */
    async saveFeedback(formData) {
      try {
        const res = await ApiService.post('/feedbacks', formData);
        this.$store.commit('tasks/setFreelancerApplicationFeedback', res.data.data.feedback);
        this.$store.commit('tasks/setFreelancerApplicationStatus', res.data.data.application.status);

        this.$store.dispatch('ui/showNotification', {
          type: 'success',
          text: this.$t('freelancers.application_completed_message'),
        });

        this.$store.commit('tasks/closeFeedbackModal');


        const taskRes = await ApiService.get(`/tasks/${this.application.taskId}`);
        const taskBcId = taskRes.data.data.bcId;
        try {
          if (res.data.data.application.status === 2 || res.data.data.application.status === 4) {
            smartContract
              .setLeaveFeedbackFlancerProperties(
                res.data.data.feedback.id,
                taskBcId,
                formData.rate,
                formData.message,
              )
              .then((r) => {
                ApiService.put('/feedbacks/regBcLeaveFeedbackFlancer', r);
              });
          } else if (res.data.data.application.status === 3) {
            smartContract
              .setCancelContractFlancerProperties(
                res.data.data.feedback.id,
                taskBcId,
                formData.rate,
                formData.message,
              )
              .then((r) => {
                ApiService.put('/feedbacks/regBcCancelContractFlancer', r);
              });
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
