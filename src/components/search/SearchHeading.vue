<template>
  <div class="search-heading d-flex align-items-center justify-content-between">
    <div class="d-flex align-items-center">
      <categories-dropdown @select="selectCategory" class="mr-5"/>
      <sort-dropdown @select="selectSort"/>
    </div>
    <quick-search @search="search"/>
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
      this.$emit('category', c);
    },
    selectSort(c) {
      this.$emit('sort', c);
    },
    search(e) {
      this.$emit('search', e);
    },
  },
};
</script>
