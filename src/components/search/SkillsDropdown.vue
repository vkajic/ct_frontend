<template>
  <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none pl-0" no-caret>
    <template slot="button-content">
      <strong>{{skill ? skill : 'Skill'}}</strong>
      <chevron-down-icon size="10" class="ml-2"/>
      <a @click.prevent="removeSkill" v-if="skill">
        <x-icon size="1x"/>
      </a>
    </template>
    <b-dropdown-item-button v-for="(c, i) in skills"
                            :active="c === skill"
                            :key="i"
                            @click="selectSkill(c)">
      {{c}}
    </b-dropdown-item-button>
  </b-dropdown>
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
      type: String,
      default: null,
    },
    skill: {
      type: String,
      default: null,
    },
  },
  computed: {
    skills() {
      if (this.category) {
        return this.$store.state.util.skills
          .find(c => c.name === this.category)
          .skills
          .map(s => s.name);
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
