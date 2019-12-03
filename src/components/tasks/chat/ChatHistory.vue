<template>
  <div class="chat-history">
    <chat-history-header :term="term" @search="search" />
    <hr>
    <chat-history-client-list v-if="role === 'client'"
                              :term="term"
                              @open="open" />
    <chat-history-freelancer-list v-if="role === 'freelancer'"
                                  :term="term"
                                  @open="open" />
  </div>
</template>

<script>
import ChatHistoryHeader from './ChatHistoryHeader.vue';
import ChatHistoryClientList from './ChatHistoryClientList.vue';
import ChatHistoryFreelancerList from './ChatHistoryFreelancerList.vue';
// noinspection JSUnusedGlobalSymbols

export default {
  name: 'ChatHistory',
  components: {
    ChatHistoryHeader,
    ChatHistoryClientList,
    ChatHistoryFreelancerList,
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
    /**
     * Set activeItem in store and emit select event
     */
    open(app) {
      this.$store.commit('messages/setActiveItem', app.id);
      this.$emit('select', app);
    },
  },
  created() {
    this.$store.dispatch('messages/getApplications');
  },
};
</script>
