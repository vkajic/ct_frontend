<template>
  <div class="mb-3" v-if="message.text || hasAttachments">
    <div class="chat-message d-flex align-items-start">
      <chat-avatar :message="message"/>
      <div class="flex-grow-1">
        <div class="d-flex align-items-center">
          <div class="name">{{senderName}}</div>
          <div class="date">{{createdAt}}</div>
        </div>
        <div class="message">
          <span v-if="!hasAttachments">{{message.text}}</span>

          <template v-if="hasAttachments">
            <ul class="list-unstyled m-0">
              <li v-for="attachment in message.attachments"
                  :key="attachment.id"
                  class="list-inline-item">
                <chat-attachment :attachment="attachment" :message="message"
                                 @delete="attachmentDeleted"/>
              </li>
            </ul>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { get } from 'lodash';
import ChatAttachment from './ChatAttachment.vue';
import ChatAvatar from './ChatAvatar.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ChatMessage',
  components: { ChatAvatar, ChatAttachment },
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  computed: {
    senderName() {
      const { sender, role } = this.message;
      const profile = get(sender, role);

      if (profile) {
        return profile.name;
      }

      return '';
    },
    createdAt() {
      return moment(this.message.createdAt)
        .format('D.M.YYYY. HH:mm:ss');
    },
    hasAttachments() {
      return this.message.attachments && this.message.attachments.length;
    },
  },
  methods: {
    attachmentDeleted() {
      //
    },
  },
};
</script>
