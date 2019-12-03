<template>
  <div class="chat-history-list">
    <chat-history-item v-for="(app) in Applications"
                :key="app.id + 'chat-item'"
                :application="app"
                :class="{'chat-item-active': active === app.id}"
                @click.native="$emit('open', app)"/>

    <div v-if="loading" class="text-muted">
      Loading!
    </div>
    <div v-else-if="Applications.length === 0 && !loading" class="text-muted">
      No messages!
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ChatHistoryItem from './ChatHistoryItem.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ChatHistoryFreelancerList',
  components: {
    ChatHistoryItem,
  },
  props: {
    term: {
      type: String,
      default: null,
    },
  },
  computed: {
    Applications() {
      if (this.term) {
        // filtering by full name or job name
        return this.apps.filter(app => app.role.name.toLowerCase().includes(this.term.toLowerCase())
                  || app.taskTitle.toLowerCase().includes(this.term.toLowerCase()));
      }
      return this.apps;
    },
    ...mapState('messages', {
      apps: state => state.applications || [],
      active: state => state.activeItem,
      loading: state => state.loading,
    }),
  },
};
</script>
