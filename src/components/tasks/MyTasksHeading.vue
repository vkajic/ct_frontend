<template>
  <div class="search-heading d-flex">
    <div class="d-flex align-items-center">
      <sort-dropdown class="sort-dropdown" @select="selectSort"/>
    </div>
    <quick-search @search="search"/>
  </div>
</template>

<script>
import SortDropdown from '../search/SortDropdown.vue';
import QuickSearch from '../ui/QuickSearch.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'MyTasksHeading',
  components: {
    QuickSearch,
    SortDropdown,
  },
  methods: {
    selectSort(e) {
      this.$emit('sort', e);
    },
    search(e) {
      this.$emit('search', e);
    },
  },
};
</script>
