<template>
  <page-wrapper>
    <h1>{{task.title}}</h1>
    <small-employer :employer="application.client" class="mb-5"/>

    <b-tabs>
      <b-tab title="Project details" class="py-4">
        {{task.description}}
      </b-tab>
      <b-tab title="Messages">
        <chat-container :task="task" :application="application"/>
      </b-tab>
    </b-tabs>

    <template slot="sidebar">
      <task-details class="mt-7" :task="task" :applicable="false"/>
      <required-skills class="skills" :skills="task.skills" v-if="task.skills"/>
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
  computed: {
    ...mapState('tasks', {
      application: state => state.selectedApplication,
    }),
    task() {
      return this.application ? this.application.task : {};
    },
  },
  created() {
    const id = parseInt(this.$route.params.id, 10);

    // get application data
    this.$store.dispatch('tasks/getApplication', id);

    // set messages as read for this application
    this.$store.dispatch('chat/readMessages', id);
  },
  destroyed() {
    // deselect application
    this.$store.commit('tasks/setSelectedApplication', {});
  },
};
</script>
