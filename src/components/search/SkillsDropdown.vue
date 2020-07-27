<template>
  <div class="dropdown-wrapper">
    <a class="dropdown__clear-btn" @click.prevent="removeSkill" v-if="skill">
      <x-icon size="1x"/>
    </a>
    <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none px-0" no-caret>
      <template slot="button-content">
        <div class="dropdown__button-wrapper">
          <strong>{{skill ? skill.name : $t('freelancers_search.select_skills')}}</strong>
          <chevron-down-icon size="16" class="ml-2"/>
        </div>
      </template>
      <b-dropdown-item-button v-for="(c, i) in skills"
                              :active="c === skill"
                              :key="i"
                              @click="selectSkill(c)">
        {{c.name}}
      </b-dropdown-item-button>
    </b-dropdown>
  </div>
</template>

<script>
import { ChevronDownIcon, XIcon } from 'vue-feather-icons';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'SkillsDropdown',
  components: {
    ChevronDownIcon,
    XIcon,
  },
  props: {
    category: {
      type: Object,
      default: null,
    },
    skill: {
      type: Object,
      default: null,
    },
  },
  computed: {
    skills() {
      if (this.category) {
        return this.$store.getters['util/getSkillsByCategory'](this.category.id);
      }

      return [];
    },
  },
  methods: {
    selectSkill(c) {
      this.$emit('select', c);
    },

    removeSkill() {
      this.$emit('select', null);
    },
  },
};
</script>
