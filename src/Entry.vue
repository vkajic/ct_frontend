<template>
  <router-view/>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Entry',
  created() {
    // init users data
    /* this.$store.dispatch('user/init')
      .then(() => {
        // load users tasks
        this.$store.dispatch('tasks/loadMyTasks');
        this.$store.dispatch('chat/getUnreadMessages');
      }); */
  },
};
</script>
