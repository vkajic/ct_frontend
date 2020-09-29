<template>
  <div class="logo">
    <template v-if="currentLanguage === 'hr'">
      <img v-if="isDarkThemeEnabled" src="@/assets/img/powered_by_cryptotask_dark.png"
           alt="Freelance.hr"/>
      <img v-else src="@/assets/img/powered_by_cryptotask_light.png"
           alt="Freelance.hr"/>
    </template>
    <template v-else>
      <img v-if="isDarkThemeEnabled" src="@/assets/img/cryptotask-logo--light.svg"
           alt="Cryptotask"/>
      <img v-else src="@/assets/img/cryptotask-logo.svg"
           alt="Cryptotask"/>
    </template>
  </div>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'LogoImage',
  computed: {
    /**
     * Current language
     * @return string
     */
    currentLanguage() {
      return this.$store.state.util.activeLanguage;
    },
    /**
     * Check if dark theme is enabled
     * @return boolean
     * */
    isDarkThemeEnabled() {
      return this.$store.state.ui.isDarkThemeEnabled;
    },
  },
};
</script>

<style scoped>

</style>
