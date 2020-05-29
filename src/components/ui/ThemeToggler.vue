<template>
  <sun-icon v-if="isDarkThemeEnabled"
            class="theme-icon"
            @click="toggleDarkTheme">
  </sun-icon>
  <moon-icon v-else
             class="theme-icon"
             @click="toggleDarkTheme">
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
  created() {
    const isDarkThemeEnabled = localStorage.getItem('dark-theme');
    if (isDarkThemeEnabled) {
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
