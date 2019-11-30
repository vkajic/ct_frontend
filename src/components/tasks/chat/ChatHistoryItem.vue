<template>
  <div class="chat-history-item">
    <header class="d-flex align-items-start p-3">
      <div class="d-flex flex-fill align-items-center">
        <chat-history-avatar :avatar="user.avatar" :online="application.online"/>
        <div class="flex-fill">
          <div class="user-name">
            {{user.name}} <small>- {{application.taskTitle}}</small>
          </div>
          <div class="user-msg">{{application.lastMsg.from}}: {{application.lastMsg.text}}</div>
        </div>
      </div>
      <div class="text-muted ml-1">
        <small>{{application.lastMsg.date | date('HH:mm')}}</small>
      </div>
    </header>
    <!-- <div class="loading text-center text-muted p-2" v-else>Loading...</div> -->
  </div>
</template>

<script>
import { dateFilter } from 'vue-date-fns';
import ChatHistoryAvatar from './ChatHistoryAvatar.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ChatHistoryItem',
  components: {
    ChatHistoryAvatar,
  },
  props: {
    application: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      user: null,
    };
  },
  filters: {
    date: dateFilter,
  },
  created() {
    this.user = this.application.freelancer || this.application.client;
  },
};
</script>
