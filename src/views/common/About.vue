<template>
  <div>
    <div class="row mb-6 pt-6">
      <div class="col-12 col-lg-10 offset-lg-1">
        <component v-if="body" :is="body"/>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-lg-10 offset-lg-1 my-5">
        <h2>{{ $t('about.future') }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */

import AboutEn from '@/components/about/AboutEn.vue';
import AboutHr from '@/components/about/AboutHr.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'About',
  components: {
    AboutEn,
    AboutHr,
  },
  computed: {
    body() {
      const currentLang = this.$store.getters['util/getCurrentLanguage'];

      if (currentLang) {
        return `about-${currentLang.code}`;
      }

      return null;
    },
  },
};
</script>

<style scoped>

</style>
