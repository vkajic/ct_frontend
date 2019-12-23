<template>
  <div>
    <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none px-0" no-caret>
      <template slot="button-content">
        <strong>{{category ? category : 'Category'}}</strong>
        <chevron-down-icon size="10" class="ml-2"/>
      </template>
      <b-dropdown-item-button v-for="(c, i) in categories"
                              :active="c === category"
                              :key="i"
                              @click="selectCategory(c)">
        {{c}}
      </b-dropdown-item-button>
    </b-dropdown>
    <a @click.prevent="removeCategory" v-if="category">
      <x-icon size="1x"/>
    </a>
  </div>
</template>

<script>
import { ChevronDownIcon, XIcon } from 'vue-feather-icons';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'CategoriesDropdown',
  components: {
    ChevronDownIcon,
    XIcon,
  },
  props: {
    category: {
      type: String,
      default: null,
    },
  },
  computed: {
    categories() {
      return this.$store.state.util.skills.map(c => c.name);
    },
  },
  methods: {
    selectCategory(c) {
      this.$emit('select', c);
    },

    removeCategory() {
      this.$emit('select', null);
    },
  },
};
</script>
