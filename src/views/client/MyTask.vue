<template>
  <div class="task row">
    <div class="col-3 pt-5">
      <left-menu/>
    </div>
    <div class="col-6">
      <h1>{{task.title}}</h1>
      <small-employer :employer="task.client" class="mb-5"/>

      <b-tabs>
        <b-tab title="Project details" class="py-4">
          {{task.description}}
        </b-tab>
        <b-tab title="Applied freelancers" class="pt-3">
          <div v-if="task.applications">
            <applied-freelancer :application="a"
                                :key="i"
                                v-for="(a, i) in task.applications"/>
          </div>
          <div v-if="!task.applications || !task.applications.length">
            <div class="h1 mb-4">
              You have no applications for this task atm...
            </div>
            <a href="#"><u>Browse freelancers</u></a>
          </div>
        </b-tab>
        <b-tab title="Messages"></b-tab>
      </b-tabs>
    </div>
    <div class="col-2">
      <task-details class="mt-7" :task="task" :applicable="false"/>
      <required-skills class="skills" :skills="task.skills" v-if="task.skills"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import LeftMenu from '../../components/layout/LeftMenu.vue';
import SmallEmployer from '../../components/tasks/SmallEmployer.vue';
import TaskDetails from '../../components/tasks/TaskDetails.vue';
import RequiredSkills from '../../components/tasks/RequiredSkills.vue';
import AppliedFreelancer from '../../components/tasks/AppliedFreelancer.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'MyTask',
  components: {
    AppliedFreelancer,
    RequiredSkills,
    TaskDetails,
    SmallEmployer,
    LeftMenu,
  },
  computed: {
    ...mapState('tasks', {
      task: state => state.selectedTask,
    }),
  },
  created() {
    const id = parseInt(this.$route.params.id, 10);

    // get task data
    this.$store.dispatch('tasks/selectTask', id);
  },
  destroyed() {
    // deselect application
    this.$store.commit('tasks/setSelectedTask', null);
  },
};
</script>
