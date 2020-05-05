<template>
  <sun-icon v-if="isDarkThemeEnabled"
            class="theme-icon"
            @click="toggleDarkMode">
  </sun-icon>
  <moon-icon v-else
             class="theme-icon"
             @click="toggleDarkMode">
  </moon-icon>
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
      isDarkThemeEnabled: false,
    };
  },
  methods: {
    enableDarkTheme() {
      const { body } = document;
      this.isDarkThemeEnabled = true;
      body.classList.add('dark-theme');
      localStorage.setItem('dark-theme', 'active');
    },
    disableDarkTheme() {
      const { body } = document;
      this.isDarkThemeEnabled = false;
      body.classList.remove('dark-theme');
      localStorage.removeItem('dark-theme');
    },
    toggleDarkMode() {
      const isDarkThemeActive = localStorage.getItem('dark-theme');

      if (isDarkThemeActive) {
        this.isDarkThemeEnabled = true;
        this.disableDarkTheme();
        return;
      }
      this.enableDarkTheme();
    },
  },
  created() {
    const isDarkThemeActive = localStorage.getItem('dark-theme');
    console.log(isDarkThemeActive);
    if (isDarkThemeActive) this.enableDarkTheme();
  },
};
</script>
