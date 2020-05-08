<template>
  <div>
    <div class="d-none d-lg-block py-2">
      <router-link to="/">
        <div class="logo">
          <img src="@/assets/img/cryptotask-logo--light.svg" alt="Cryptotask"/>
        </div>
      </router-link>
    </div>
    <div class="d-lg-none">
      <template v-if="funnelItemNum > 0">
        <a href="#" @click.prevent="goBack" class="mr-3" v-if="funnelItemNum > 1">
          <arrow-left-icon size="1.5x"/>
        </a>
        <strong>{{funnelItemTitle}}</strong> {{funnelItemNum}}/{{funnelItemsCount}}
      </template>
      <template v-else>
        <router-link to="/" class="d-block">
          <div class="logo">
            <img src="@/assets/img/cryptotask-logo.svg" alt="Cryptotask"/>
          </div>
        </router-link>
      </template>
    </div>
  </div>
</template>

<script>
import { ArrowLeftIcon } from 'vue-feather-icons';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'LogoBack',
  components: {
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
