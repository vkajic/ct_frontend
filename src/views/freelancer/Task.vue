<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div>
          <h1>{{task.title}}</h1>
          <small-employer :employer="task.owner" class="mb-3 mb-lg-5"/>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-lg-3 offset-lg-2 order-lg-2">
        <task-details :task="task"/>
        <required-skills class="p-4 m-2" :skills="task.skills" v-if="task.skills"/>
      </div>
      <div class="col-12 col-lg-6 order-lg-1">
        <p class="pt-3 pt-lg-0">{{task.description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import SmallEmployer from '../../components/tasks/SmallEmployer.vue';
import TaskDetails from '../../components/tasks/TaskDetails.vue';
import RequiredSkills from '../../components/tasks/RequiredSkills.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Task',
  components: {
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
