<template>
  <div>
    <a href="#"
       @click.prevent="showNotifications"
       id="popover-button-sync"
       class="notifications-indicator">
      <bell-icon size="1.5x"/>
      <div class="notifications-indicator-number" v-if="count">
        {{count}}
      </div>
    </a>
    <b-popover :show="popoverVisible"
               target="popover-button-sync"
               custom-class="notifications-popover"
               placement="bottomleft"
               @hide="hideNotifications">
      <b-list-group flush>
        <b-list-group-item class="flex-column align-items-start"
                           v-for="n in notifications"
                           :key="n.id">
          <notification-item :notification="n" @open="open"/>
        </b-list-group-item>
      </b-list-group>
    </b-popover>
  </div>
</template>

<script>
import { BellIcon } from 'vue-feather-icons';
import NotificationItem from './NotificationItem.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'NotificationsPopover',
  components: {
    NotificationItem,
    BellIcon,
  },
  methods: {
    /**
     * Show notifications preview popover
     */
    showNotifications() {
      this.$store.commit('notifications/showPopover');
    },

    /**
     * Hide notifications preview popover
     */
    hideNotifications() {
      this.$store.commit('notifications/hidePopover');
    },

    /**
     * Open
     */
    open(n) {
      this.$store.dispatch('notifications/seeNotification', n);
      this.hideNotifications();
    },
  },
  computed: {
    /**
     * Is notifications preview popover visible
     * @return {boolean}
     */
    popoverVisible() {
      return this.$store.state.notifications.popoverDisplayed;
    },

    /**
     * List of unread messages
     * @return {|Array}
     */
    notifications() {
      return this.$store.state.notifications.notifications || [];
    },

    /**
     * Count of notifications
     * @return {number}
     */
    count() {
      return this.notifications.length;
    },
  },
  created() {
    this.$store.dispatch('notifications/getNotifications');
  },
};
</script>
