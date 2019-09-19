<template>
  <div class="task row">
    <div class="col-3 pt-5">
      <left-menu/>
    </div>
    <div class="col-6">
      <h1>{{task.title}}</h1>
      <small-employer :employer="task.owner" class="mb-5"/>

      <p>{{task.description}}</p>
    </div>
    <div class="col-2">
      <task-details class="mt-7" :task="task"/>
      <required-skills class="skills" :skills="task.skills" v-if="task.skills"/>
    </div>
  </div>
</template>

<script>
import SmallEmployer from '../../components/tasks/SmallEmployer.vue';
import TaskDetails from '../../components/tasks/TaskDetails.vue';
import RequiredSkills from '../../components/tasks/RequiredSkills.vue';
import LeftMenu from '../../components/layout/LeftMenu.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Task',
  components: {
    LeftMenu,
    RequiredSkills,
    TaskDetails,
    SmallEmployer,
  },
  mounted() {
    const { id } = this.$route.params;
    this.$store.dispatch('tasks/selectTask', id);
  },
  computed: {
    task() {
      return this.$store.state.tasks.selectedTask;
    },
  },
};
</script>
