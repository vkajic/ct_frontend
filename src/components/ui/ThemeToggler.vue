<template>
  <sun-icon class="theme-icon" v-if="!isDark" @click="toggleDarkMode"></sun-icon>
  <moon-icon class="theme-icon" v-else @click="toggleDarkMode"></moon-icon>
</template>
<script>
import { SunIcon, MoonIcon } from 'vue-feather-icons';

export default {
  name: 'ThemeToggler',
  components: {
    SunIcon,
    MoonIcon,
  },
  data() {
    return {
      isDark: false,
    };
  },
  methods: {
    toggleDarkMode() {
      const { body } = document;
      this.isDark = !this.isDark;
      body.classList.toggle('dark-theme');
    },
  },
};
</script>
<style lang="scss" scoped>
  .theme-icon {
    margin-left: 1rem;
    cursor: pointer;
  }
</style>
