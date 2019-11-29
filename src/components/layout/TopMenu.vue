<template>
  <ul class="top-menu list-unstyled list-inline m-0" v-if="!user">
    <li class="list-inline-item"><a href="#">Browse Jobs</a></li>
    <li class="list-inline-item"><a href="#">Browse Freelancers</a></li>
    <li class="list-inline-item"><a href="#">Post Job</a></li>
    <li class="list-inline-item"><a href="#">How It Works</a></li>
  </ul>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'TopMenu',
  computed: {
    user() {
      return this.$store.state.user.user;
    },
  },
};
</script>
