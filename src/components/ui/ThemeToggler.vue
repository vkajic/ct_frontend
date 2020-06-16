<template>
  <a href="#" @click.prevent="toggleDarkTheme" class="mr-3 d-flex align-items-center">
    <sun-icon v-if="isDarkThemeEnabled" class="theme-icon" size="1.5x"/>
    <moon-icon v-else class="theme-icon" size="1.5x"/>
  </a>
</template>
<script>
import { SunIcon, MoonIcon } from 'vue-feather-icons';

export default {
  name: 'ThemeToggler',
  components: {
    SunIcon,
    MoonIcon,
  },
  created() {
    const { mode } = this.$route.query;
    const isDarkThemeEnabled = localStorage.getItem('dark-theme');
    if (mode) {
      if (mode === 'dark') {
        this.enableDarkTheme();
        this.$store.commit('ui/enableDarkTheme');
      } else {
        this.$store.commit('ui/disableDarkTheme');
        this.disableDarkTheme();
      }
    } else if (isDarkThemeEnabled) {
      this.enableDarkTheme();
      this.$store.commit('ui/enableDarkTheme');
    }
  },
  computed: {
    /**
     * Check if dark theme is enabled
     * @return boolean
     * */
    isDarkThemeEnabled() {
      return this.$store.state.ui.isDarkThemeEnabled;
    },
  },
  methods: {
    /**
     * Enables dark theme, adds item to local storage
     * */
    enableDarkTheme() {
      const { body } = document;
      body.classList.add('dark-theme');
      localStorage.setItem('dark-theme', 'enabled');
    },
    /**
     * Enables dark theme, removes item to local storage
     * */
    disableDarkTheme() {
      const { body } = document;
      body.classList.remove('dark-theme');
      localStorage.removeItem('dark-theme');
    },
    /**
     * Toggles theme
     * */
    toggleDarkTheme() {
      const isDarkThemeEnabled = localStorage.getItem('dark-theme');

      if (isDarkThemeEnabled) {
        this.$store.commit('ui/disableDarkTheme');
        this.disableDarkTheme();
        return;
      }
      this.$store.commit('ui/enableDarkTheme');
      this.enableDarkTheme();
    },
  },
};
</script>
