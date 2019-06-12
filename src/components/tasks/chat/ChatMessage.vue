<template>
  <div class="row mb-3">
    <div class="col-sm-9" :class="{'offset-sm-3': type === 'sent'}">
      <div class="chat-message p-2" :class="[type]">
        <div class="name">{{message.Sender.name}} <span>{{createdAt}}</span></div>
        <div class="message">{{message.text}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ChatMessage',
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  computed: {
    type() {
      const userId = this.$store.state.user.user.id;

      return userId === this.message.senderId ? 'sent' : 'received';
    },
    createdAt() {
      return this.message ? moment(this.message.createdAt).format('D.M.YYYY. HH:mm:ss') : '';
    },
  },
};
</script>
