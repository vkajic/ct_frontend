<template>
  <div class="d-flex align-items-center">
    <div class="user-info-widget d-flex align-items-center pr-lg-4" v-if="loggedIn">
      <!-- <notifications-popover/> -->

      <div class="ml-3 ml-lg-4">
        <user-menu/>
      </div>
    </div>
    <div class="d-none d-xl-flex user-info-widget align-items-center" v-if="!loggedIn">
      <ul class="list-unstyled list-inline m-0">
        <li class="list-inline-item pr-3">
          <language-router-link to="/login">{{ $t('common.login') }}</language-router-link>
        </li>
        <li class="list-inline-item">
          <language-router-link to="/sign-up">{{ $t('common.sign_up') }}</language-router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import NotificationsPopover from '../notifications/NotificationsPopover.vue';
import UserMenu from './UserMenu.vue';
import LanguageRouterLink from './LanguageRouterLink.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'UserInfo',
  components: {
    LanguageRouterLink,
    UserMenu,
    // NotificationsPopover,
  },
  computed: {
    /**
     * Is user logged in currently
     * @return {boolean}
     */
    loggedIn() {
      return !!this.$store.state.user.token;
    },
  },
};
</script>
