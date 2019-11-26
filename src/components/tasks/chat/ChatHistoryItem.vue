<template>
  <div class="chat-history-item">
    <header v-if="!loading" class="d-flex align-items-start p-3">
      <div class="d-flex flex-fill">
        <chat-history-avatar :avatar="avatar" :online="true"/>
        <div class="flex-fill">
          <div class="user-name">
            {{user.name}}
          </div>
          <div class="user-msg">{{lastMsg.from}}: {{lastMsg.text}}</div>
        </div>
      </div>
      <div class="text-muted">
        <small>{{lastMsg.date | date('HH:mm')}}</small>
      </div>
    </header>
    <div class="loading text-center text-muted p-2" v-else>Loading...</div>
  </div>
</template>

<script>
import { dateFilter } from 'vue-date-fns';
import ChatHistoryAvatar from './ChatHistoryAvatar.vue';
import apiService from '../../../services/api.service';

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
      avatar: null,
      lastMsg: {},
      loading: true,
    };
  },
  filters: {
    date: dateFilter,
  },
  methods: {
    getInfo(application) {
      this.user = application.freelancer || application.client;
      this.avatar = this.user.avatar || this.user.pictureId;
      apiService.get(`/messages/last_message/${application.id}`)
        .then((res) => {
          if (res.data.data) {
            const from = res.data.data.sender[res.data.data.role];
            this.lastMsg = {
              text: res.data.data.text,
              from: this.$store.state.user.user.id === res.data.data.senderId ? 'You' : from.name,
              date: res.data.data.updatedAt,
            };
          } else {
            // if there is no messages display application letter
            this.lastMsg = {
              text: application.letter,
              from: 'You',
              date: application.createdAt,
            };
          }
          this.loading = false;
        }).catch(err => console.log(err));
    },
  },
  mounted() {
    this.getInfo(this.application);
  },
};
</script>
