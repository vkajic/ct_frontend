<template>
  <div class="header-menu">
    <div v-if="user">
      <ul class="list-unstyled list-inline mb-0">
        <li class="list-inline-item">
          <router-link to="/search">Search jobs</router-link>
        </li>
        <li class="list-inline-item"><a href="#" @click.prevent="logout">Logout</a></li>
        <li class="list-inline-item ml-3">
          Hi, <router-link to="/profile">{{user.name}}</router-link>
        </li>
        <li class="list-inline-item" v-if="unreadMessages">
          <unread-messages-list/>
        </li>
      </ul>
    </div>
    <div v-if="!user">
      <ul class="list-unstyled list-inline mb-0">
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
// noinspection JSUnusedGlobalSymbols
import UnreadMessagesList from './tasks/chat/UnreadMessagesList.vue';

export default {
  name: 'HeaderMenu',
  components: { UnreadMessagesList },
  computed: {
    user() {
      return this.$store.state.user.user;
    },
    unreadMessages() {
      return this.$store.getters['chat/getNumberOfUnreadMessages'];
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logout');
    },
  },
};
</script>
