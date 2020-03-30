<template>
  <div class="chat-history-list">
    <template v-if="!taskId">
      <client-grouped-threads v-for="(group, key) in threads"
                              :threads="group"
                              :key="key"
                              @click="openThread"/>
    </template>
    <template v-else>
      <template v-if="firstGroup.length">
        <thread v-for="thread in firstGroup"
                :key="thread.id"
                :thread="thread"
                role="client"
                @click="openThread"/>
      </template>
      <template v-else>
        <p class="text-center">No applications for this task.</p>
      </template>
    </template>
  </div>
</template>

<script>
import ClientGroupedThreads from './ClientGroupedThreads.vue';
import Thread from './Thread.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ClientThreads',
  components: {
    Thread,
    ClientGroupedThreads,
  },
  props: {
    taskId: {
      type: Number,
      default: null,
    },
  },
  computed: {
    /**
     * Get list of threads
     */
    threads() {
      return this.taskId
        ? this.$store.getters['chat/getTaskGroupedThreads'](this.taskId)
        : this.$store.getters['chat/getGroupedThreads'];
    },
    /**
     * Get first item in threads for single task threads
     * @return {*}
     */
    firstGroup() {
      const keys = Object.keys(this.threads);
      return keys.length ? this.threads[keys[0]] : [];
    },
  },
  methods: {
    async openThread(thread) {
      this.$store.commit('tasks/setSelectedApplication', thread);

      // set messages as read for this application
      await this.$store.dispatch('chat/readMessages', thread.id);

      this.$store.commit('ui/setTaskSelectedTab', 3);

      // redirect to page if not already there
      const path = `/my-tasks/${thread.taskId}`;
      if (this.$route.path !== path) {
        await this.$router.push(path);
      }
    },
  },
};
</script>
