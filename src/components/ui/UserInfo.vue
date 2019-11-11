<template>
  <div>
    <div class="user-info-widget d-flex align-items-center pr-4" v-if="loggedIn">
      <a href="#" @click="showNotifications">
        <bell-icon size="1.5x"/>
      </a>

      <div class="ml-3">
        <b-dropdown :text="userName || ''" variant="link" no-caret right>
          <b-dropdown-item-button @click="logout">Logout</b-dropdown-item-button>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item to="/profile">Edit Profile</b-dropdown-item>
          <b-dropdown-item to="/change-password">Change password</b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
    <div class="user-info-widget d-flex align-items-center pr-4" v-if="!loggedIn">
      <ul class="list-unstyled list-inline">
        <li class="list-inline-item">
          <router-link to="/login">Login</router-link>
        </li>
        <li class="list-inline-item">
          <router-link to="/sign-up">Sign Up</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { BellIcon } from 'vue-feather-icons';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'UserInfo',
  components: {
    BellIcon,
  },
  methods: {
    showNotifications(e) {
      e.preventDefault();
    },
    logout() {
      this.$store.dispatch('user/logout');
    },
  },
  computed: {
    loggedIn() {
      return !!this.$store.state.user.token;
    },
    userName() {
      return this.$store.getters['user/getUserName'];
    },
  },
};
</script>
