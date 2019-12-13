<template>
  <div v-if="application">
    <div class="row">
      <div class="col-12">
        <h1>{{task.title}}</h1>
        <small-employer :employer="application.client" class="mb-3 mb-lg-5"/>
      </div>
    </div>
    <div class="row">
      <div class="d-none d-lg-block col-lg-3 offset-lg-1 order-lg-2 pb-4">
        <task-details :task="task" :applicable="false"/>
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
import SmallEmployer from './SmallEmployer.vue';
import TaskDetails from './TaskDetails.vue';
import RequiredSkills from './RequiredSkills.vue';
import ChatContainer from './chat/ChatContainer.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ApplicationFreelancer',
  components: {
    ChatContainer,
    RequiredSkills,
    TaskDetails,
    SmallEmployer,
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
