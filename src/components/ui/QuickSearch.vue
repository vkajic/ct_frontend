<template>
  <b-form @submit.prevent="search" class="quick-search">
    <b-form-input v-model="term" placeholder="Search"/>
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
      term: null,
    };
  },
  methods: {
    search() {
      this.$emit('search', this.term);
    },
  },
};
</script>
