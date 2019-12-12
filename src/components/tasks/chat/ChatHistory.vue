<template>
  <div class="chat-history">
    <chat-history-header :term="term" @search="search"/>
    <hr>
    <client-threads v-if="role === 'client'"/>
    <freelancer-threads v-if="role === 'freelancer'"/>
  </div>
</template>

<script>
import ChatHistoryHeader from './ChatHistoryHeader.vue';
import ClientThreads from './ClientThreads.vue';
import FreelancerThreads from './FreelancerThreads.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ChatHistory',
  components: {
    FreelancerThreads,
    ClientThreads,
    ChatHistoryHeader,
  },
  data() {
    return {
      term: null,
    };
  },
  computed: {
    /**
     * Current user active role
     */
    role() {
      return this.$store.state.user.activeRole;
    },
  },
  methods: {
    /**
     * Set search term
     */
    search(term) {
      this.term = term;
    },
  },
};
</script>
