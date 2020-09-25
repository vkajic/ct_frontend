<template>
  <div>
    <div class="d-none d-lg-block py-2">
      <language-router-link to="/">
        <logo-image/>
      </language-router-link>
    </div>
    <div class="d-lg-none">
      <template v-if="funnelItemNum > 0">
        <a href="#" @click.prevent="goBack" class="mr-3" v-if="funnelItemNum > 1">
          <arrow-left-icon size="1.5x"/>
        </a>
        <strong>{{ funnelItemTitle }}</strong> {{ funnelItemNum }}/{{ funnelItemsCount }}
      </template>
      <template v-else>
        <language-router-link to="/" class="d-block">
          <logo-image/>
        </language-router-link>
      </template>
    </div>
  </div>
</template>

<script>
import { ArrowLeftIcon } from 'vue-feather-icons';
import LogoImage from '@/components/layout/LogoImage.vue';
import LanguageRouterLink from '../ui/LanguageRouterLink.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'LogoBack',
  components: {
    LogoImage,
    LanguageRouterLink,
    ArrowLeftIcon,
  },
  computed: {
    freelancerFunnelMapping() {
      return {
        basicInfo: this.$t('freelancers.basic_info'),
        skills: this.$t('freelancers.skills_services'),
        workExperience: this.$t('freelancers.work_experience'),
        projects: this.$t('freelancers.projects'),
        preview: this.$t('freelancers.publish_button'),
      };
    },
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
