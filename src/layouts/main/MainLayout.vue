<template>
  <div>
    <main-layout-header/>
    <div class="container">
      <global-notification/>
      <div class="row">
        <div class="col-lg-3 d-none d-lg-block pt-5" v-if="showMenu">
          <left-menu/>
          <chat-history class="mt-5" v-if="loggedIn && showChat"/>
        </div>
        <div class="col-12 col-lg-9">
          <slot/>
          <loading-overlay :visible="loading"/>
        </div>
      </div>
    </div>
    <main-layout-footer/>
  </div>
</template>

<script>
import MainLayoutHeader from './MainLayoutHeader.vue';
import MainLayoutFooter from './MainLayoutFooter.vue';
import GlobalNotification from '../../components/ui/GlobalNotification.vue';
import LeftMenu from '../../components/layout/LeftMenu.vue';
import ChatHistory from '../../components/tasks/chat/ChatHistory.vue';
import LoadingOverlay from '../../components/ui/LoadingOverlay.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'MainLayout',
  components: {
    LoadingOverlay,
    ChatHistory,
    LeftMenu,
    GlobalNotification,
    MainLayoutFooter,
    MainLayoutHeader,
  },
  computed: {
    /**
     * Is loading activated
     * @return {boolean|default.props.manualLoading|{default, type}}
     */
    loading() {
      return this.$store.state.ui.mainLoader || this.manualLoading;
    },

    /**
     * Is user logged in
     * @return {Boolean}
     */
    loggedIn() {
      return !!this.$store.state.user.user;
    },

    /**
     * Is left menu displayed on this page
     * @return {Boolean}
     */
    showMenu() {
      return this.$route.meta.showMenu !== false;
    },

    /**
     * Is chat displayed on this page
     * @return {Boolean}
     */
    showChat() {
      return this.$route.meta.showChat !== false;
    },
  },
};
</script>
