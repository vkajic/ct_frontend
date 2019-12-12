<template>
  <div>
    <thread v-for="thread in threads"
            :key="thread.applicationId"
            :thread="thread"
            role="freelancer"
            @click="openThread"/>
  </div>
</template>

<script>
import Thread from './Thread.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'FreelancerThreads',
  components: { Thread },
  computed: {
    threads() {
      return this.$store.state.chat.threads;
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
      const path = thread.status === 0
        ? `/applications/${thread.id}`
        : `/in-progress/${thread.id}`;
      if (this.$route.path !== path) {
        await this.$router.push(path);
      }
    },
  },
};
</script>
