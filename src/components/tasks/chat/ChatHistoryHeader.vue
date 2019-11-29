<template>
  <div class="search-heading d-flex align-items-center justify-content-between">
    <strong class="dropdown-toggle-no-caret">Messages</strong>
    <quick-chat-search @search="search" :term="term"/>
  </div>
</template>

<script>
import QuickChatSearch from '../../ui/QuickChatSearch.vue';
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ChatHistoryHeader',
  components: {
    QuickChatSearch,
  },
  props: {
    term: {
      type: String,
      default: null,
    },
  },
  methods: {
    search(e) {
      this.$emit('search', e);
    },
  },
};
</script>
