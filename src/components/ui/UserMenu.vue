<template>
  <b-dropdown variant="link" no-caret right toggle-class="p-0" size="lg">
    <template slot="button-content">
      <span class="d-none d-lg-block small">{{userName}}</span>
      <span class="d-block d-lg-none">
              <user-icon size="1.5x" />
            </span>
    </template>
    <b-dropdown-item-button @click="logout">Logout</b-dropdown-item-button>
    <b-dropdown-divider/>
    <b-dropdown-item to="/profile">Edit Profile</b-dropdown-item>
    <b-dropdown-item to="/profile/preview">Preview Profile</b-dropdown-item>
    <b-dropdown-item to="/change-password">Change password</b-dropdown-item>
  </b-dropdown>
</template>

<script>
import { UserIcon } from 'vue-feather-icons';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'UserMenu',
  components: {
    UserIcon,
  },
  methods: {
    /**
     * Logout
     */
    logout() {
      this.$store.dispatch('user/logout');
    },
  },
  computed: {
    /**
     * Get users name
     * @return {*}
     */
    userName() {
      return this.$store.getters['user/getUserName'];
    },
  },
};
</script>
