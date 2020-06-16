<template>
  <ul class="top-menu list-unstyled list-inline m-0" v-if="!user">
    <li class="list-inline-item">
      <router-link to="/tasks">Browse Jobs</router-link>
    </li>
    <li class="list-inline-item">
      <router-link to="/freelancers">Browse Freelancers</router-link>
    </li>
    <li class="list-inline-item">
      <router-link to="/login">Post Job</router-link>
    </li>
    <li class="list-inline-item">
      <a :href="landingUrl">How It Works</a>
    </li>
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
    landingUrl() {
      return `${process.env.VUE_APP_LANDING_URL}how-cryptotask-works?mode=${this.isDarkThemeEnabled ? 'dark' : 'light'}`;
    },
    isDarkThemeEnabled() {
      return this.$store.state.ui.isDarkThemeEnabled;
    },
  },
};
</script>
