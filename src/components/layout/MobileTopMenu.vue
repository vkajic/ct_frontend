<template>
  <b-dropdown class="dropdown--responsive d-xl-none" variant="link" no-caret right toggle-class="p-0" v-if="!user">
    <template slot="button-content">
        <span class="d-block">
              <menu-icon size="1.5x" />
        </span>
    </template>
    <b-dropdown-item to="/tasks">Browse Jobs</b-dropdown-item>
    <b-dropdown-item to="/freelancers">Browse Freelancers</b-dropdown-item>
    <b-dropdown-item to="/login">Post Job</b-dropdown-item>
    <b-dropdown-item to="landingUrl">How It Works</b-dropdown-item>
    <b-dropdown-divider/>
    <b-dropdown-item to="/login">Login</b-dropdown-item>
    <b-dropdown-item to="/sign-up">Sign up</b-dropdown-item>
  </b-dropdown>
</template>

<script>
import { MenuIcon } from 'vue-feather-icons';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'MobileTopMenu',
  components: {
    MenuIcon,
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    },
    landingUrl() {
      return `${process.env.VUE_APP_LANDING_URL}how-cryptotask-works`;
    },
  },
};
</script>
