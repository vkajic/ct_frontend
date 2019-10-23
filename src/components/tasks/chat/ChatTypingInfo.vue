<template>
  <div v-if="isTyping" class="typing-user">{{typingUser}} is typing...</div>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ChatTypingInfo',
  props: {
    application: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isTyping: false,
      typingUser: null,
    };
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    },
  },
  sockets: {
    /**
     * Emitted when user starts typing
     * @param {Object} data
     * @param {Object} data.id - user id
     * @param {Object} data.name - user name
     */
    userTyping(data) {
      if (this.user && this.user.id !== data.id) {
        this.isTyping = true;
        this.typingUser = data.name;
      }
    },

    /**
     * Emitted when user stopped typing
     * @param {Object} data
     * @param {Object} data.id - user id
     * @param {Object} data.name - user name
     */
    userStoppedTyping(data) {
      if (this.user && this.user.id !== data.id) {
        this.isTyping = false;
        this.typingUser = null;
      }
    },
  },
};
</script>
