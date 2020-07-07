<template>
  <b-dropdown-item :to="url"><slot/></b-dropdown-item>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'LanguageDropdownItem',
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  computed: {
    url() {
      if (typeof this.to !== 'string') {
        return this.to;
      }
      const { lang } = this.$route.params;
      // we strip leading and trailing slashes and prefix
      // the current lang
      return lang ? `/${lang}/${this.to.replace(/^\/|\/$/g, '')}` : this.to;
    },
  },
};
</script>

<style scoped>

</style>
