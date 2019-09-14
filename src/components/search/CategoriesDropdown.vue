<template>
  <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none pl-0" no-caret>
    <template slot="button-content">
      <strong>Category</strong>
      <chevron-down-icon size="10" class="ml-2"/>
    </template>
    <b-dropdown-item-button v-for="(c, i) in categories" :key="i"
                     @click="selectCategory(c)">
      {{c}}
    </b-dropdown-item-button>
  </b-dropdown>
</template>

<script>
import { ChevronDownIcon } from 'vue-feather-icons';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'CategoriesDropdown',
  components: {
    ChevronDownIcon,
  },
  computed: {
    categories() {
      return ['Programming', 'Design', 'Copywriting'];
    },
  },
  methods: {
    selectCategory(c) {
      this.$emit('select', c);
    },
  },
};
</script>
