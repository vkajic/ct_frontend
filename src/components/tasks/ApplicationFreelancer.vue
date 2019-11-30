<template>
  <page-wrapper v-if="application">
    <h1>{{task.title}}</h1>
    <small-employer :employer="application.client" class="mb-5"/>

    <b-tabs v-model="active">
      <b-tab title="Project details" class="py-4">
        {{task.description}}
      </b-tab>
      <b-tab title="Messages">
        <chat-container :task="task" :application="application"/>
      </b-tab>
    </b-tabs>
    <template slot="sidebar">
      <task-details class="mt-7" :task="task" :applicable="false"/>
      <required-skills class="skills p-4 m-2" :skills="task.skills" v-if="task.skills"/>
    </template>
  </page-wrapper>
</template>

<script>
import { mapState } from 'vuex';
import SmallEmployer from './SmallEmployer.vue';
import TaskDetails from './TaskDetails.vue';
import RequiredSkills from './RequiredSkills.vue';
import ChatContainer from './chat/ChatContainer.vue';
import PageWrapper from '../ui/PageWrapper.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ApplicationFreelancer',
  components: {
    PageWrapper,
    ChatContainer,
    RequiredSkills,
    TaskDetails,
    SmallEmployer,
  },
  data() {
    return {
      active: 0,
    };
  },
  computed: {
    ...mapState('tasks', {
      application: state => state.selectedApplication,
    }),
    task() {
      return this.application && this.application.task ? this.application.task : {};
    },
  },
  methods: {
    getData(val) {
      const id = parseInt(val, 10);

      // get application data
      this.$store.dispatch('tasks/getApplication', id);

      // set messages as read for this application
      this.$store.dispatch('chat/readMessages', id);

      // if there is openMsg prop open messages tab
      if (this.$route.params.openMsgs) {
        this.active = 1;
      }
    },
  },
  /**
   * Watch for $route.params.id change
   */
  watch: {
    '$route.params.id': function (n) {
      // deselect application
      this.$store.commit('tasks/setSelectedApplication', {});

      // get data for new id
      this.getData(n);
    },
  },
  created() {
    this.$store.commit('tasks/setSelectedApplication', {});
    this.getData(this.$route.params.id);
  },
  destroyed() {
    // deselect application
    this.$store.commit('tasks/setSelectedApplication', {});
  },
};
</script>
