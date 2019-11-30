<template>
  <a href="#" @click.prevent="open" class="notification-item">
    <div class="d-flex w-100 justify-content-between align-items-end mb-2">
      <h5 class="mb-0 mr-3">New Message</h5>
      <small>{{formattedDate}}</small>
    </div>

    <p class="mb-1">
      {{truncatedMessage}}
    </p>

    <small>{{notification.payload.application.task.title}}</small>
  </a>
</template>

<script>
import { truncate } from 'lodash';
import moment from 'moment';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'NewMessage',
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  methods: {
    open() {
      this.$emit('open', this.notification);
      this.$router.push({
        name: this.userRole === 'freelancer' ? 'application' : 'myTask',
        params: {
          id: this.userRole === 'freelancer'
            ? this.notification.payload.application.id
            : this.notification.payload.application.task.id,
          openMsgs: true,
          applicationId: this.notification.payload.application.id,
        },
      });
    },
  },
  computed: {
    /**
     * Format date to human readable string (10 minutes ago, 5 seconds ago...)
     * @params {String} date
     */
    formattedDate() {
      return moment(this.notification.createdAt)
        .fromNow();
    },

    /**
     * Truncate message
     */
    truncatedMessage() {
      return truncate(this.notification.payload.message.text, {
        separator: ' ',
      });
    },

    /**
     * Current user active role
     * @return {default.computed.activeRole|null}
     */
    userRole() {
      return this.$store.state.user.activeRole;
    },
  },
};
</script>
