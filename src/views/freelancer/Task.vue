<template>
  <page-wrapper :sidebar-width="3" :reverse="true">
    <template slot="title">
      <div>
        <h1>{{task.title}}</h1>
        <small-employer :employer="task.owner" class="mb-3 mb-lg-5"/>
      </div>
    </template>

    <p class="pt-3 pt-lg-0">{{task.description}}</p>

    <template slot="sidebar">
      <task-details :task="task"/>
      <required-skills class="p-4 m-2" :skills="task.skills" v-if="task.skills"/>
    </template>
  </page-wrapper>
</template>

<script>
import SmallEmployer from '../../components/tasks/SmallEmployer.vue';
import TaskDetails from '../../components/tasks/TaskDetails.vue';
import RequiredSkills from '../../components/tasks/RequiredSkills.vue';
import PageWrapper from '../../components/ui/PageWrapper.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Task',
  components: {
    PageWrapper,
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
