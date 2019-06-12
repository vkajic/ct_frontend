<template>
  <div>
    <div class="col-title text-center">
      <router-link class="btn btn-primary" to="/create-task">
        Post new job
      </router-link>
      <h3>My posted tasks</h3>


    </div>
  </div>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'MyPostedTasks',
  computed: {
    // tasks() {
    //   return this.$store.state.task.myPosted;
    // },
  },
};
</script>
