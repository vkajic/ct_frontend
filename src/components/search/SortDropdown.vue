<template>
  <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none pl-0" no-caret>
    <template slot="button-content">
      <strong>Sort</strong>
      <chevron-down-icon size="10" class="ml-2"/>
    </template>
    <b-dropdown-item-button v-for="(c, i) in types" :key="i"
                            @click="selectSort(c)">
      {{c}}
    </b-dropdown-item-button>
  </b-dropdown>
</template>

<script>
import { ChevronDownIcon } from 'vue-feather-icons';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'SortDropdown',
  components: {
    ChevronDownIcon,
  },
  computed: {
    types() {
      return ['Date Added', 'Location', 'Price'];
    },
  },
  methods: {
    selectSort(c) {
      this.$emit('select', c);
    },
  },
};
</script>

<style scoped>

</style>
