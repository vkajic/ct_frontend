<template>
  <div>
    <div class="col-title text-center">
      <router-link class="btn btn-primary" to="/create-task">
        Post new job
      </router-link>
      <h3>My posted tasks</h3>
      <my-posted-task v-for="t in tasks" :key="t.id" :task="t"/>
    </div>
  </div>
</template>

<script>
import MyPostedTask from './MyPostedTask.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'MyPostedTasks',
  components: { MyPostedTask },
  computed: {
    tasks() {
      return this.$store.state.tasks.myPosted;
    },
  },
};
</script>
