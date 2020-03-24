<template>
  <div class="search-heading d-flex">
    <div class="search-heading__dropdown-group d-flex">
      <categories-dropdown @select="selectCategory" :category="category" class="mr-lg-5"/>
      <skills-dropdown @select="selectSkill" :category="category" :skill="skill" class="mr-lg-5"/>
    </div>
    <div class="search-heading__search">
      <quick-search @search="search" :term="term"/>
    </div>
  </div>
</template>

<script>
import CategoriesDropdown from '../search/CategoriesDropdown.vue';
import QuickSearch from '../ui/QuickSearch.vue';
import SkillsDropdown from '../search/SkillsDropdown.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'FreelancersSearchHeading',
  components: {
    SkillsDropdown,
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
    skill: {
      type: String,
      default: null,
    },
  },
  methods: {
    selectCategory(c) {
      this.$emit('category', c);
    },
    selectSkill(s) {
      this.$emit('skill', s);
    },
    search(e) {
      this.$emit('search', e);
    },
  },
};
</script>
