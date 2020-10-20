<template>
  <router-view/>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Entry',
  created() {
    // load static data
    this.$store.dispatch('util/getSkills');
    this.$store.dispatch('util/getLanguages');

    this.$i18n.locale = this.$route.params.lang;
  },
  /* computed: {
    activeLanguage() {
      return this.$store.state.util.activeLanguage;
    },
  },
  watch: {
    activeLanguage(n, o) {
      if (n && n !== o) {
        const favicon = document.getElementById('favicon');
        // eslint-disable-next-line import/no-dynamic-require,global-require
        favicon.href = require(`./assets/img/favicon-${n}.ico`);
        console.log('settings favicon', favicon);
      }
    },
  }, */
};
</script>
