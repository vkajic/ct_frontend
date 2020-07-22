<template>
  <div>
    <div class="d-none d-lg-block py-2">
      <language-router-link to="/">
        <div class="logo">
          <img v-if="isDarkThemeEnabled" src="@/assets/img/cryptotask-logo--light.svg"
               alt="Cryptotask"/>
          <img v-else src="@/assets/img/cryptotask-logo.svg"
               alt="Cryptotask"/>
        </div>
      </language-router-link>
    </div>
    <div class="d-lg-none">
      <template v-if="funnelItemNum > 0">
        <a href="#" @click.prevent="goBack" class="mr-3" v-if="funnelItemNum > 1">
          <arrow-left-icon size="1.5x"/>
        </a>
        <strong>{{funnelItemTitle}}</strong> {{funnelItemNum}}/{{funnelItemsCount}}
      </template>
      <template v-else>
        <language-router-link to="/" class="d-block">
          <div class="logo">
            <img v-if="isDarkThemeEnabled" src="@/assets/img/cryptotask-logo--light.svg"
                 alt="Cryptotask"/>
            <img v-else src="@/assets/img/cryptotask-logo.svg"
                 alt="Cryptotask"/>
          </div>
        </language-router-link>
      </template>
    </div>
  </div>
</template>

<script>
import { ArrowLeftIcon } from 'vue-feather-icons';
import LanguageRouterLink from './LanguageRouterLink.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'LogoBack',
  components: {
    LanguageRouterLink,
    ArrowLeftIcon,
  },
  data() {
    return {
      freelancerFunnelMapping: {
        basicInfo: 'Basic info',
        skills: 'Skills & services',
        workExperience: 'Work experience',
        projects: 'Projects',
        preview: 'Publish profile',
      },
    };
  },
  computed: {
    /**
     * Count of items in funnel menu
     */
    funnelItemsCount() {
      return Object.keys(this.freelancerFunnelMapping).length;
    },

    /**
     * Order number of item in funnel
     * @return {number}
     */
    funnelItemNum() {
      const current = this.$route.name;
      return Object.keys(this.freelancerFunnelMapping)
        .indexOf(current) + 1;
    },

    /**
     * Title of funnel item
     * @return {*}
     */
    funnelItemTitle() {
      const current = this.$route.name;
      return this.freelancerFunnelMapping[current];
    },
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
     * Go back one page
     */
    goBack() {
      this.$router.back();
    },
  },
};
</script>
