<template>
  <ul class="top-menu list-unstyled list-inline m-0" v-if="!user">
    <li class="list-inline-item">
      <language-router-link to="/tasks">{{ $t('common.browse_jobs') }}</language-router-link>
    </li>
    <li class="list-inline-item">
      <language-router-link to="/freelancers">{{ $t('common.browse_freelancers') }}
      </language-router-link>
    </li>
    <li class="list-inline-item">
      <language-router-link to="/login">{{ $t('common.post_job') }}</language-router-link>
    </li>
    <li class="list-inline-item">
      <a :href="landingUrl">{{ $t('common.how_it_works') }}</a>
    </li>
  </ul>
</template>

<script>
import LanguageRouterLink from '../ui/LanguageRouterLink.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'TopMenu',
  components: { LanguageRouterLink },
  computed: {
    user() {
      return this.$store.state.user.user;
    },
    landingUrl() {
      return `${process.env.VUE_APP_LANDING_URL}how-cryptotask-works?mode=${this.isDarkThemeEnabled ? 'dark' : 'light'}`;
    },
    isDarkThemeEnabled() {
      return this.$store.state.ui.isDarkThemeEnabled;
    },
  },
};
</script>
