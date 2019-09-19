<template>
  <div>
    <div class="user-info-widget d-flex align-items-center pr-4" v-if="loggedIn">
      <a href="#" @click="showNotifications">
        <bell-icon size="1.5x"/>
      </a>

      <div class="ml-3">{{userName}}</div>
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

// TODO add dropdown with logout

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
