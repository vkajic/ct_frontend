<template>
  <b-form @submit.prevent="search" class="quick-chat-search">
    <transition name="fade-width" mode="out-in" @after-enter="afterEnter">
      <b-form-input v-if="slide" v-model="searchTerm" placeholder="Search"/>
      <div v-else class="fake-input"></div>
    </transition>
    <button @click="slide = true">
      <search-icon size="24"/>
    </button>
  </b-form>
</template>

<script>
import { SearchIcon } from 'vue-feather-icons';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'QuickChatSearch',
  components: {
    SearchIcon,
  },
  data() {
    return {
      searchTerm: null,
      slide: false,
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
    afterEnter(el) {
      if (el.tagName === 'INPUT') {
        el.focus();
      }
    },
  },
  created() {
    this.searchTerm = this.term;
  },
};
</script>
