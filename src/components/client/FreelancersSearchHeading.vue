<template>
  <div class="search-heading d-flex align-items-center justify-content-between">
    <div class="d-flex align-items-center">
      <categories-dropdown @select="selectCategory" :category="category" class="mr-5"/>
    </div>
    <quick-search @search="search" :term="term"/>
  </div>
</template>

<script>
import CategoriesDropdown from '../search/CategoriesDropdown.vue';
import QuickSearch from '../ui/QuickSearch.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'FreelancersSearchHeading',
  components: {
    QuickSearch,
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
  },
  methods: {
    selectCategory(c) {
      this.$emit('category', c);
    },
    search(e) {
      this.$emit('search', e);
    },
  },
};
</script>
