<template>
  <div class="search-heading d-flex">
    <div class="search-heading__dropdown-group d-flex">
      <categories-dropdown @select="selectCategory" class="mr-lg-5" :category="category"/>
      <sort-dropdown @select="selectSort" :sort="sort"/>
    </div>
    <quick-search @search="search" :term="term"/>
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
  props: {
    term: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      default: null,
    },
    sort: {
      type: Object,
      default() {
        return {};
      },
    },
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
