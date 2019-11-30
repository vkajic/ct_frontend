<template>
  <page-wrapper :sidebar-width="2">
    <h1>{{task.title}}</h1>
    <small-employer :employer="task.client" class="mb-5"/>

    <b-tabs v-model="selectedTab">
      <b-tab title="Project details" class="py-4">
        {{task.description}}
      </b-tab>
      <b-tab title="Freelancers applied" class="pt-3">
        <div v-if="task.applications">
          <applied-freelancer :application="a"
                              :task="task"
                              class="mb-5"
                              :key="i"
                              v-for="(a, i) in task.applications"
                              @select="goToMessages"/>
        </div>
        <div v-if="!task.applications || !task.applications.length">
          <div class="h1 mb-4">
            You have no applications for this task atm...
          </div>
          <router-link to="/freelancers"><u>Browse freelancers</u></router-link>
        </div>
      </b-tab>
      <b-tab title="Messages">
        <chat-container v-if="selectedApplication"
                        :task="task"
                        :application="selectedApplication"/>
      </b-tab>
    </b-tabs>

    <template slot="sidebar">
      <task-details class="mt-7" :task="task" :applicable="false"/>
      <required-skills class="p-4 m-2" :skills="task.skills" v-if="task.skills"/>
    </template>
  </page-wrapper>
</template>

<script>
import { mapState } from 'vuex';
import SmallEmployer from '../../components/tasks/SmallEmployer.vue';
import TaskDetails from '../../components/tasks/TaskDetails.vue';
import RequiredSkills from '../../components/tasks/RequiredSkills.vue';
import AppliedFreelancer from '../../components/tasks/AppliedFreelancer.vue';
import ChatContainer from '../../components/tasks/chat/ChatContainer.vue';
import PageWrapper from '../../components/ui/PageWrapper.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'MyTask',
  components: {
    PageWrapper,
    ChatContainer,
    AppliedFreelancer,
    RequiredSkills,
    TaskDetails,
    SmallEmployer,
  },
  data() {
    return {
      selectedTab: 0,
    };
  },
  computed: {
    ...mapState('tasks', {
      task: state => state.selectedTask || {},
      selectedApplication: state => state.selectedApplication,
    }),
  },
  methods: {
    /**
     * Change tab to messages
     */
    async goToMessages(application) {
      this.selectedTab = 2;

      console.log(application);

      // get application data
      await this.$store.dispatch('tasks/getApplication', application.id);

      // set messages as read for this application
      await this.$store.dispatch('chat/readMessages', application.id);

      // subscribe to chat
      this.$socket.emit('subscribe', application.id);
    },
    getData(val) {
      const id = parseInt(val, 10);

      // get task data
      this.$store.dispatch('tasks/selectTask', id);

      // if there is openMsg prop open messages tab
      if (this.$route.params.openMsgs) {
        this.goToMessages({ id: this.$route.params.applicationId });
      }
    },
  },
  /**
   * Watch for $route.params.id and activeItem change
   */
  watch: {
    '$route.params.id': function (n) {
      if (n) {
        // deselect application and task
        this.$store.commit('tasks/setSelectedTask', null);
        this.$store.commit('tasks/setSelectedApplication', null);

        // get data for new id
        this.getData(n);
      }
    },
    '$store.state.messages.activeItem': function (n, o) {
      if (n) {
        // unsubscribe to chat
        this.$socket.emit('unsubscribe', o);

        this.goToMessages({ id: n });
      }
    },
  },
  created() {
    this.getData(this.$route.params.id);
  },
  destroyed() {
    // deselect application and task
    this.$store.commit('tasks/setSelectedTask', null);
    this.$store.commit('tasks/setSelectedApplication', null);
  },
};
</script>
