<template>
  <div class="row">
    <div class="d-none d-lg-block pt-5" :class="menuClass">
      <left-menu v-if="showMenu"/>
      <chat-history class="mt-5" @select="openMessages" v-if="loggedIn && showChat"/>
    </div>
    <div class="col-12" :class="bodyClass">
      <slot/>
      <loading-overlay :visible="loading"/>
    </div>
  </div>
</template>

<script>
import LeftMenu from '../layout/LeftMenu.vue';
import LoadingOverlay from './LoadingOverlay.vue';
import ChatHistory from '../tasks/chat/ChatHistory.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'PageWrapper',
  components: {
    ChatHistory,
    LoadingOverlay,
    LeftMenu,
  },
  props: {
    manualLoading: {
      type: Boolean,
      default: false,
    },
    menuWidth: {
      type: Number,
      default: 3,
    },
    showMenu: {
      type: Boolean,
      default: true,
    },
    showChat: {
      type: Boolean,
      default: true,
    },
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
  },
  methods: {
    /**
     * Call correct function based on role
     */
    openMessages(application) {
      if (this.$store.state.user.activeRole === 'client') {
        this.openForClient(application);
      } else {
        this.openForFreelancer(application);
      }
    },
    /**
     * Open myTask view with application params
     */
    openForClient(application) {
      this.$router.push({
        name: 'myTask',
        params: {
          id: application.taskId,
          openMsgs: true,
          applicationId: application.id,
        },
      });
    },
    /**
     * Open correct view with application params
     */
    openForFreelancer(application) {
      if (application.status === 1) {
        // if freelancer is hired
        this.$router.push({
          name: 'inProgressItem',
          params: {
            id: application.id,
            openMsgs: true,
          },
        });
      } else {
        // if freelancer applied
        this.$router.push({
          name: 'application',
          params: {
            id: application.id,
            openMsgs: true,
          },
        });
      }
    },
  },
};
</script>
