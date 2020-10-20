<template>
  <a href="#" @click.prevent="toggleDarkTheme" class="d-flex align-items-center">
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
    this.setTheme();
  },
  watch: {
    routeMode() {
      this.setTheme();
    },
  },
  computed: {
    /**
     * Check if dark theme is enabled
     * @return boolean
     * */
    isDarkThemeEnabled() {
      return this.$store.state.ui.isDarkThemeEnabled;
    },

    routeMode() {
      return this.$route.query.mode;
    },
  },
  methods: {
    setTheme() {
      const isDarkThemeEnabled = localStorage.getItem('dark-theme');
      if ((this.routeMode && this.routeMode === 'dark') || (!this.routeMode && isDarkThemeEnabled)) {
        this.enableDarkTheme();
        this.$store.commit('ui/enableDarkTheme');
      } else {
        this.disableDarkTheme();
        this.$store.commit('ui/disableDarkTheme');
      }
    },

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
