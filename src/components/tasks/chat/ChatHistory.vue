<template>
  <div class="chat-history">
    <chat-history-header :term="term" @search="search" />
    <hr>
    <chat-history-item v-for="(app) in Applications"
                      :key="app.id + 'chat-item'"
                      :application="app"
                      :class="{'chat-item-active': active === app.id}"
                      @click.native="open(app)"/>

    <div v-if="loading" class="text-muted">
      Loading!
    </div>
    <div v-else-if="Applications.length === 0" class="text-muted">
      No messages!
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ChatHistoryHeader from './ChatHistoryHeader.vue';
import ChatHistoryItem from './ChatHistoryItem.vue';
// noinspection JSUnusedGlobalSymbols

export default {
  name: 'ChatHistory',
  components: {
    ChatHistoryHeader,
    ChatHistoryItem,
  },
  data() {
    return {
      term: null,
      clean: false,
    };
  },
  props: {
    applications: {
      type: Array,
    },
  },
  computed: {
    Applications() {
      if (this.term) {
        // filtering by full name
        return this.apps.filter((app) => {
          const user = app.freelancer || app.client;
          return user.name.toLowerCase().includes(this.term.toLowerCase());
        });
      }
      return this.apps;
    },
    ...mapState('messages', {
      apps: state => state.applications || [],
      active: state => state.activeItem,
      loading: state => state.loading,
    }),
  },
  methods: {
    search(term) {
      this.term = term;
    },
    open(app) {
      this.$store.commit('messages/setActiveItem', app.id);
      this.$emit('select', app);
    },
  },
  created() {
    if (this.applications) {
      // map aplication ids and get all client aplications info
      const ids = this.applications.map(app => app.id);
      this.$store.dispatch('messages/getApplicationsClient', ids);
      this.clean = true;
    } else {
      // if prop is undefined get applications info for user
      this.$store.dispatch('messages/getApplicationsFreelancer');
    }
  },
  beforeDestroy() {
    if (this.clean) {
      this.$store.commit('messages/setApplications', []);
    }
  },
};
</script>
