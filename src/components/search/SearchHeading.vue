<template>
  <div class="search-heading d-flex align-items-center justify-content-between">
    <div class="d-flex align-items-center">
      <categories-dropdown @select="selectCategory" class="mr-5"/>
      <sort-dropdown @select="selectSort"/>
    </div>
    <quick-search/>
  </div>
</template>

<script>
import CategoriesDropdown from './CategoriesDropdown.vue';
import SortDropdown from './SortDropdown.vue';
import QuickSearch from '../ui/QuickSearch.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'SearchHeading',
  components: {
    QuickSearch,
    SortDropdown,
    CategoriesDropdown,
  },
  methods: {
    selectCategory(c) {
      console.log(c);
    },
    selectSort(c) {
      console.log(c);
    },
  },
};
</script>
