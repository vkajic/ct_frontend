<template>
  <div class="row mb-3">
    <div class="col-sm-9" :class="{'offset-sm-3': type === 'sent'}">
      <div class="chat-message p-2" :class="[type]">
        <div class="name">{{message.Sender.name}} <span>{{createdAt}}</span></div>
        <div class="message" v-if="!hasAttachments">{{message.text}}</div>

        <template v-if="hasAttachments">
          <ul class="list-unstyled list-inline m-0">
            <li v-for="attachment in message.Attachments"
                :key="attachment.id"
                class="list-inline-item">
              <chat-attachment :attachment="attachment"/>
            </li>
          </ul>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import ChatAttachment from './ChatAttachment.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ChatMessage',
  components: { ChatAttachment },
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
      return this.message ? moment(this.message.createdAt)
        .format('D.M.YYYY. HH:mm:ss') : '';
    },
    hasAttachments() {
      return this.message && this.message.Attachments.length;
    },
  },
};
</script>
