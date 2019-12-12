<template>
  <a href="#" @click.prevent="selectThread" class="thread d-flex align-items-center mb-2">
    <chat-history-avatar :avatar="otherUser.avatar" :online="otherUser.user.online"/>
    <div class="flex-grow-1">
      <div class="d-flex justify-content-between align-items-center">
        <h6 class="m-0">{{otherUser.name}}</h6>
        <div class="text-muted"><small>{{timeString}}</small></div>
      </div>
      {{fromString}}: {{truncatedText}}
    </div>
  </a>
</template>

<script>
import moment from 'moment';
import { get, truncate } from 'lodash';
import ChatHistoryAvatar from './ChatHistoryAvatar.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Thread',
  components: { ChatHistoryAvatar },
  props: {
    thread: {
      type: Object,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  computed: {
    /**
     * Get other user data
     */
    otherUser() {
      const otherRole = this.role === 'client' ? 'freelancer' : 'client';
      return this.thread[otherRole];
    },

    /**
     * Get message sender name
     */
    fromString() {
      if (this.thread.lastMessage) {
        const currentUserId = get(this.$store.state.user, 'user.id');

        if (currentUserId === this.thread.lastMessage.senderId) {
          return 'You';
        }
      }
      return this.otherUser.firstName ? this.otherUser.firstName : this.otherUser.name;
    },

    /**
     * Format message created at time
     * @return {string}
     */
    timeString() {
      const time = this.thread.lastMessage
        ? this.thread.lastMessage.createdAt
        : this.thread.createdAt;

      const dateTime = moment(time);
      return moment()
        .isSame(dateTime, 'day')
        ? dateTime.format('HH:mm:ss')
        : dateTime.format('D.M.YYYY HH:mm:ss');
    },

    /**
     * Truncate text to reasonable length
     * @return {string}
     */
    truncatedText() {
      const text = this.thread.lastMessage
        ? this.thread.lastMessage.text
        : '';

      return truncate(text, {
        separator: ' ',
        length: 36,
      });
    },
  },
  methods: {
    /**
     * Emit clicked thread
     */
    selectThread() {
      this.$emit('click', this.thread);
    },
  },
};
</script>
