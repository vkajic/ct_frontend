<template>
  <div class="row">
    <div class="col-lg-3 d-none d-lg-block pt-5" v-if="showMenu">
      <left-menu/>
      <chat-history class="mt-5" v-if="loggedIn && showChat"/>
    </div>
    <div class="col-12 col-lg-9">
      <router-view/>
      <loading-overlay :visible="loading"/>
    </div>
  </div>
</template>

<script>
import LeftMenu from './components/layout/LeftMenu.vue';
import ChatHistory from './components/tasks/chat/ChatHistory.vue';
import LoadingOverlay from './components/ui/LoadingOverlay.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Entry',
  components: {
    LoadingOverlay,
    ChatHistory,
    LeftMenu,
  },
  created() {
    // load static data
    this.$store.dispatch('util/getSkills');
    this.$store.dispatch('util/getLanguages');
  },
  computed: {
    /**
     * Build menu classes
     * @return {string}
     */
    menuClass() {
      return `col-lg-${this.menuWidth}`;
    },

    /**
     * Body part class
     */
    bodyClass() {
      return `col-lg-${12 - this.menuWidth}`;
    },

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

    /**
     * Left menu width
     * @return {Number}
     */
    menuWidth() {
      return this.$route.meta.menuWidth === undefined ? 3 : this.$route.meta.menuWidth;
    },
  },
};
</script>
