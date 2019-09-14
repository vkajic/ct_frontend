<template>
  <div class="search-heading d-flex align-items-center justify-content-between">
    <div class="d-flex align-items-center">
      <sort-dropdown @select="selectSort"/>
    </div>
    <quick-search/>
  </div>
</template>

<script>
import SortDropdown from '../search/SortDropdown.vue';
import QuickSearch from '../ui/QuickSearch.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'MyJobsHeading',
  components: {
    QuickSearch,
    SortDropdown,
  },
};
</script>
