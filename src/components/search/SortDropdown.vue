<template>
  <div class="dropdown-wrapper">
    <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none px-0" no-caret>
      <template slot="button-content">
        <div class="dropdown__button-wrapper">
          <strong>Sort</strong>
          <chevron-down-icon size="16" class="ml-2"/>
        </div>
      </template>
      <b-dropdown-item-button v-for="(c, i) in types"
                              :key="i"
                              :active="c.key === sort.by"
                              @click="selectSort(c.key)">
        <div class="d-flex align-items-center justify-content-between">
          <span class="pr-2">{{c.label}}</span>
          <chevrons-down-icon size="1x" v-if="c.key === sort.by && sort.dir === 'desc'" />
          <chevrons-up-icon size="1x" v-if="c.key === sort.by && sort.dir === 'asc'" />
        </div>
      </b-dropdown-item-button>
    </b-dropdown>
  </div>
</template>

<script>
import { ChevronsDownIcon, ChevronDownIcon, ChevronsUpIcon } from 'vue-feather-icons';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'SortDropdown',
  components: {
    ChevronsDownIcon,
    ChevronDownIcon,
    ChevronsUpIcon,
  },
  props: {
    sort: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    types() {
      return this.$store.state.search.sortOptions;
    },
  },
  methods: {
    selectSort(c) {
      this.$emit('select', c);
    },
  },
};
</script>
