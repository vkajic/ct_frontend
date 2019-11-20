<template>
  <div class="chat-history-item">
    <header class="d-flex align-items-start p-3">
      <div class="d-flex flex-fill">
        <avatar-picture :file="user.avatar" :thumbnail="true"/>
        <div class="flex-fill">
          <div class="user-name">
            {{user.fullName}}
          </div>
          <div class="user-msg">{{user.lastMsg.from}}: {{user.lastMsg.text}}</div>
        </div>
      </div>
      <div class="text-muted">
        <small>{{user.lastMsg.time | date('HH:mm')}}</small>
      </div>
    </header>
  </div>
</template>

<script>
import { dateFilter } from 'vue-date-fns';
import AvatarPicture from '../../profile/AvatarPicture.vue';
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ChatHistoryItem',
  components: {
    AvatarPicture,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  filters: {
    date: dateFilter,
  },
};
</script>
