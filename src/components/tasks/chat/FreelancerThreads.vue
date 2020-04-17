<template>
  <div class="chat-history-list">
    <thread v-for="thread in threads"
            :key="thread.applicationId"
            :thread="thread"
            role="freelancer"
            @click="openThread"/>
  </div>
</template>

<script>
import Thread from './Thread.vue';
import { applicationUrl } from '../../mixins/applicationUrl';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'FreelancerThreads',
  components: { Thread },
  mixins: [applicationUrl],
  computed: {
    threads() {
      return this.$store.getters['chat/getSortedThreads'];
    },
  },
  methods: {
    /**
     * Open thread for selected application
     * @param thread
     */
    async openThread(thread) {
      this.$store.commit('ui/setTaskSelectedTab', 1);

      // redirect to page if not already there
      const path = this.generateApplicationUrl(thread);
      if (this.$route.path !== path) {
        await this.$router.push(path);
      }
    },
  },
};
</script>
