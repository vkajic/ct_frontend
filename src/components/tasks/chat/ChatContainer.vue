<template>
  <div class="chat-container d-flex flex-column">
    <div class="messages flex-grow-1 mb-3" @scroll="onScroll" ref="messagesContainer">
      <div class="loading text-center p-2" v-if="loading">Loading...</div>
      <!--<p v-if="!messages.length">Send your first message!</p>-->
      <chat-message v-for="message in messages"
                    :message="message"
                    :key="message.id + 'chat-message'"/>
    </div>
    <chat-input :application="application" @send="createMessage" @attach="attach"/>
    <chat-typing-info :application="application"/>
  </div>
</template>

<script>
import ChatMessage from './ChatMessage.vue';
import ChatInput from './ChatInput.vue';
import ChatTypingInfo from './ChatTypingInfo.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ChatContainer',
  components: {
    ChatTypingInfo,
    // FileUploader,
    ChatInput,
    ChatMessage,
  },
  data() {
    return {
      scrollPosition: 0,
      isOnBottom: false,
      containerHeight: 0,
    };
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
    application: {
      type: Object,
      required: true,
    },
  },
  computed: {
    /**
     * Chat messages
     * @return {*}
     */
    messages() {
      return this.$store.getters['chat/getMessagesSorted'];
    },

    /**
     * Are messages loading currently
     * @return {boolean}
     */
    loading() {
      return this.$store.state.chat.loading;
    },

    /**
     * Get number of old messages left for loading
     */
    messagesLeftToLoad() {
      return this.$store.getters['chat/getMessagesLeft'];
    },

    /**
     * Current user active role
     */
    userRole() {
      return this.$store.state.user.activeRole;
    },
  },
  methods: {
    /**
     * Send new message
     */
    createMessage(message) {
      this.$socket.emit('sendMessage', {
        text: message,
        applicationId: this.application.id,
        role: this.userRole,
      });
    },

    /**
     * Attach files to message
     */
    attach(files) {
      this.$socket.emit('sendMessage', {
        text: '',
        applicationId: this.application.id,
        attachmentIds: files.map(f => f.id),
        role: this.userRole,
      });
    },

    /**
     * Infinite scroll messages
     */
    onScroll(e) {
      const m = e.srcElement;

      if (
        m.scrollTop < this.scrollPosition // scrolling up
        && m.scrollTop <= 30
        && !this.loading
        && this.messagesLeftToLoad > 0
      ) {
        this.$store.dispatch('chat/getMessages', this.$route.params.id);
      }

      this.scrollPosition = m.scrollTop;
      this.isOnBottom = m.clientHeight + m.scrollTop === m.scrollHeight;
    },

    /**
     * Scroll to bottom only if forced (on first load) or if scroll is on bottom
     * @param force
     */
    scrollToBottom(force) {
      const container = this.$refs.messagesContainer;

      if (force || this.isOnBottom) {
        container.scrollTop = container.scrollHeight - container.clientHeight;
      }
    },

    /**
     * Get application messages
     */
    async getMessages(id) {
      await this.$store.dispatch('chat/getMessages', id);
      this.scrollToBottom(true);
    },
  },
  created() {
    this.$store.commit('chat/resetMessages');
    this.$socket.emit('subscribe', this.application.id);
    this.getMessages(this.application.id);
  },
  destroyed() {
    console.log('destroyed');
    // reset messages in store on exit
    this.$store.commit('chat/resetMessages');
    this.$socket.emit('unsubscribe', this.application.id);
  },
  watch: {
    application(n, o) {
      if (n && (!o || n.id !== o.id)) {
        this.$store.commit('chat/resetMessages');

        // unsubscribe because messages show up in wrong chat if opened
        this.$socket.emit('unsubscribe', o.id);

        this.$socket.emit('subscribe', n.id);
        this.getMessages(n.id);
      }
    },

    /**
     * On messages length change scroll to bottom if needed
     */
    messages() {
      setTimeout(() => {
        this.scrollToBottom();
      }, 100);
    },
  },
};
</script>
