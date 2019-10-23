<template>
  <b-form @submit.prevent="search" class="quick-search">
    <b-form-input v-model="searchTerm" placeholder="Search"/>
    <button type="submit">
      <search-icon size="24"/>
    </button>
  </b-form>
</template>

<script>
import { SearchIcon } from 'vue-feather-icons';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'QuickSearch',
  components: {
    SearchIcon,
  },
  data() {
    return {
      searchTerm: null,
    };
  },
  props: {
    term: {
      type: String,
      default: null,
    },
  },
  methods: {
    search() {
      this.$emit('search', this.searchTerm);
    },
  },
  created() {
    this.searchTerm = this.term;
  },
};
</script>
