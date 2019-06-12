<template>
  <div class="chat-container container pt-3 d-flex flex-column">
    <div class="messages flex-grow-1" v-chat-scroll>
      <p v-if="!messages.length">Send your first message!</p>
      <chat-message v-for="message in messages" :message="message" :key="message.id"/>
    </div>
    <chat-input @send="createMessage"/>
  </div>
</template>

<script>
import ChatMessage from './ChatMessage.vue';
import ChatInput from './ChatInput.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ChatContainer',
  components: {
    ChatInput,
    ChatMessage,
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
      return this.$store.state.chat.messages;
    },
  },
  methods: {
    createMessage(message) {
      this.$socket.emit('sendMessage', {
        text: message,
        applicationId: this.application.id,
      });
    },
  },
  created() {
    this.$store.dispatch('chat/getMessages', this.$route.params.id);

    // subscribe to chat
    this.$socket.emit('subscribe', this.$route.params.id);
  },
  destroyed() {
    // reset messages in store on exit
    this.$store.commit('chat/setMessages', []);
    this.$socket.emit('unsubscribe', this.$route.params.id);
  },
};
</script>
