<template>
  <div class="dropdown-wrapper">
    <a class="dropdown__clear-btn" @click.prevent="removeCategory" v-if="category">
      <x-icon size="1x"/>
    </a>
    <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none px-0" no-caret>
      <template slot="button-content">
        <div class="dropdown__button-wrapper">
          <strong>{{category ? category : $t('freelancers_search.select_category')}}</strong>
          <chevron-down-icon size="16" class="ml-2"/>
        </div>
      </template>
      <b-dropdown-item-button v-for="(c, i) in categories"
                              :active="c === category"
                              :key="i"
                              @click="selectCategory(c)">
        {{c}}
      </b-dropdown-item-button>
    </b-dropdown>
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
      return _.orderBy(this.$store.state.util.skills, [skill => skill.name.toLowerCase()], 'asc').map(c => c.name);
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
