<template>
  <div class="chat-history">
    <chat-history-header :term="term" @search="search" />
    <hr>
    <chat-history-item v-for="(app) in Applications"
                      :key="app.id + 'chat-item'"
                      :application="app"
                      :class="{'chat-item-active': active === app.id}"
                      @click.native="open(app)"/>

    <div v-if="Applications.length === 0" class="text-muted">
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
    ...mapState('chat', {
      apps: state => state.applications || [],
      active: state => state.activeItem,
    }),
  },
  methods: {
    search(term) {
      this.term = term;
    },
    open(app) {
      this.$store.commit('chat/setActiveItem', app.id);
      this.$emit('select', app);
    },
  },
  mounted() {
    if (this.applications) {
      this.$store.commit('chat/setApplications', this.applications);
    } else {
      // if prop is undefined get applications for user
      this.$store.dispatch('chat/getApplications');
    }
  },
};
</script>
