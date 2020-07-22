<template>
  <div class="row">
    <div class="col-12 col-lg-7">
      <short-application-item v-for="(a, i) in applications" :key="i" :application="a"/>

      <div v-if="!applications.length && !loading">
        <div class="h1 mb-4">{{ $t('freelancers.no_active_jobs') }}</div>
        <language-router-link to="/tasks"><u>{{ $t('common.browse') }}</u></language-router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ShortApplicationItem from './ShortApplicationItem.vue';
import ApiService from '../../services/api.service';
import LanguageRouterLink from '../ui/LanguageRouterLink.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'FreelancerApplicationsList',
  components: {
    LanguageRouterLink,
    ShortApplicationItem,
  },
  props: {
    status: {
      type: Array,
      default() {
        return [1];
      },
    },
  },
  data() {
    return {
      applications: [],
      loading: false,
    };
  },
  mounted() {
    this.loading = true;
    ApiService
      .get('/applications', {
        params: {
          status: this.status,
        },
      })
      .then((res) => {
        this.applications = res.data.data;
        this.loading = false;
      });
  },
};
</script>
