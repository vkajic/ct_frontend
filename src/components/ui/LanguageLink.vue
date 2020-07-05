<template>
  <language-router-link :to="getTo()">
    <slot />
  </language-router-link>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
import LanguageRouterLink from './LanguageRouterLink.vue';
export default {
  name: 'LanguageLink',
  components: { LanguageRouterLink },
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  methods: {
    getTo() {
      if (typeof this.to !== 'string') {
        return this.to;
      }
      const { locale } = this.$route.params;
      // we strip leading and trailing slashes and prefix
      // the current locale
      return locale ? `/${locale}/${this.to.replace(/^\/|\/$/g, '')}` : this.to;
    },
  },
};
</script>
