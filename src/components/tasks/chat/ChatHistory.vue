<template>
  <div class="chat-history">
    <chat-history-header :term="term" @search="search" />
    <hr>
    <chat-history-item v-for="(app,i) in Applications"
                      :key="app.id"
                      :application="app"
                      :class="{'chat-item-active': active === i}"
                      @click.native="open(app,i)"/>

    <div v-if="Applications.length === 0" class="text-muted">
      No messages!
    </div>
  </div>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
import ChatHistoryHeader from './ChatHistoryHeader.vue';
import ChatHistoryItem from './ChatHistoryItem.vue';

export default {
  name: 'ChatHistory',
  components: {
    ChatHistoryHeader,
    ChatHistoryItem,
  },
  data() {
    return {
      term: null,
      apps: [],
      active: null,
    };
  },
  props: {
    applications: {
      type: Array,
      required: true,
    },
  },
  computed: {
    Applications() {
      return !this.term ? this.apps : this.filterUsers();
    },
  },
  methods: {
    search(term) {
      this.term = term;
    },
    filterUsers() {
      console.log('filtering by full name', this.term);
      return this.apps.filter((app) => {
        const user = app.freelancer || app.client;
        return user.name.includes(this.term);
      });
    },
    open(app, i) {
      this.$emit('select', app);
      this.active = i;
    },
  },
  created() {
    this.apps = this.applications;
  },
};
</script>
