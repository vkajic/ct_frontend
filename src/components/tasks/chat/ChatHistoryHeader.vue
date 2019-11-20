<template>
  <div class="search-heading d-flex align-items-end justify-content-between">
    <strong class="dropdown-toggle-no-caret">Chat History</strong>
    <quick-search @search="search" :term="term"/>
  </div>
</template>

<script>
import QuickSearch from '../../ui/QuickSearch.vue';
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ChatHistoryHeader',
  components: {
    QuickSearch,
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
