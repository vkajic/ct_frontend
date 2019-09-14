<template>
  <div>
    <div class="col-title text-center">
      <router-link class="btn btn-blue" to="/search">Find job</router-link>
      <h3>Tasks I am working on</h3>
    </div>

    <task-working-on v-for="t in tasks" :key="t.id" :task="t"/>
  </div>
</template>

<script>
import TaskWorkingOn from './TaskWorkingOn.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'TasksWorkingOn',
  components: { TaskWorkingOn },
  computed: {
    tasks() {
      return this.$store.state.tasks.appliedFor;
    },
  },
};
</script>
