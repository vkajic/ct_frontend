<template>
  <div class="chat-container container pt-3 d-flex flex-column">
    <div class="messages flex-grow-1" @scroll="onScroll" ref="messagesContainer">
      <div class="loading text-center p-2" v-if="loading">Loading...</div>
      <p v-if="!messages.length">Send your first message!</p>
      <chat-message v-for="message in messages" :message="message" :key="message.id"/>
    </div>
    <chat-input @send="createMessage"/>
    <file-uploader @attach="attach"/>
  </div>
</template>

<script>
import ChatMessage from './ChatMessage.vue';
import ChatInput from './ChatInput.vue';
import FileUploader from '../../FileUploader.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ChatContainer',
  components: {
    FileUploader,
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
  },
  methods: {
    /**
     * Send new message
     */
    createMessage(message) {
      this.$socket.emit('sendMessage', {
        text: message,
        applicationId: this.application.id,
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
  },
  created() {
    this.$store.dispatch('chat/getMessages', this.$route.params.id)
      .then(() => {
        this.scrollToBottom(true);
      });
  },
  destroyed() {
    // reset messages in store on exit
    this.$store.commit('chat/resetMessages');
  },
  watch: {
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
