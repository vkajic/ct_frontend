<template>
  <b-card>
    <b-form @submit.prevent="search" inline>
      <b-form-input
        v-model="term"
        type="text"
        class="flex-grow-1 mr-2"
        placeholder="Enter query term"/>
      <b-button variant="primary" type="submit" size="sm">Search</b-button>
    </b-form>
  </b-card>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'SearchQueryTerm',
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
