<template>
  <div class="row">
    <div class="d-none d-lg-block pt-5" :class="menuClass">
      <left-menu v-if="showMenu"/>
      <chat-history class="mt-5" @select="openMessages"/>
    </div>
    <div class="col-12" :class="bodyClass">
      <div class="row" v-if="hasTitleSlot">
        <div class="col-12">
          <slot name="title"/>
        </div>
      </div>
      <div class="row">
        <div class="col-12" :class="containerClass">
          <slot/>
          <loading-overlay :visible="loading"/>
        </div>
        <div class="col-12 px-0 px-lg-3" :class="sidebarClass">
          <slot name="sidebar"/>
        </div>
      </div>
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
    sidebarWidth: {
      type: Number,
      default: 3,
    },
    showMenu: {
      type: Boolean,
      default: true,
    },
    reverse: {
      type: Boolean,
      default: false,
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
     * Title column classes
     * @return {string[]}
     */
    titleClass() {
      return [`col-lg-${12 - this.menuWidth}`, `offset-lg-${this.menuWidth}`];
    },

    /**
     * Build middle container classes
     * @return {string[]}
     */
    containerClass() {
      const classes = [`col-lg-${12 - this.sidebarWidth}`];

      if (this.reverse) {
        classes.push('order-2', 'order-lg-1');
      }

      return classes;
    },

    /**
     * Build sidebar classes
     * @return {string[]}
     */
    sidebarClass() {
      const classes = [`col-lg-${this.sidebarWidth}`];

      if (this.reverse) {
        classes.push('order-1', 'order-lg-2');
      }

      return classes;
    },

    /**
     * Is loading activated
     * @return {boolean|default.props.manualLoading|{default, type}}
     */
    loading() {
      return this.$store.state.ui.mainLoader || this.manualLoading;
    },

    /**
     * Checks if title slot is added
     * @return {boolean}
     */
    hasTitleSlot() {
      return !!this.$slots.title;
    },
  },
  methods: {
    openMessages(application) {
      if (this.$store.state.user.activeRole === 'client') {
        this.openForClient(application);
      } else {
        this.openForFreelancer(application);
      }
    },
    openForClient(application) {
      this.$router.push({
        name: 'myTask',
        params: {
          id: application.taskId,
          openMsgs: true,
        },
      });
    },
    openForFreelancer(application) {
      if (application.status === 1) {
        this.$router.push({
          name: 'inProgressItem',
          params: {
            id: application.id,
            openMsgs: true,
          },
        });
      } else {
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
