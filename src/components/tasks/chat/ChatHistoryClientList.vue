<template>
  <div class="chat-history-list">
    <div v-for="(task, index) in Applications" :key="`${task.taskId}-${index}`">
      <div class="my-3 task-name" v-b-toggle="task.taskId + 'chat-collapse'">
        {{task.taskTitle}}
      </div>
      <b-collapse :id="task.taskId + 'chat-collapse'">
        <chat-history-item v-for="(app) in task.applications"
                    :key="app.id + 'chat-item'"
                    :application="app"
                    :class="{'chat-item-active': active === app.id}"
                    @click.native="$emit('open', { taskId: task.taskId, ...app })"/>
      </b-collapse>
    </div>
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
  name: 'ChatHistoryClientList',
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
        // filtering by job name
        const callback = app => app.taskTitle.toLowerCase().includes(this.term.toLowerCase());
        return this.apps.filter(callback);
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
