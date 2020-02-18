<template>
  <div class="row">
    <div class="col-12 col-lg-7">
      <short-application-item v-for="(a, i) in applications" :key="i" :application="a"/>

      <div v-if="!applications.length && !loading">
        <div class="h1 mb-4">
          You have no active jobs atm...
        </div>
        <router-link to="/tasks"><u>Browse</u></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ShortApplicationItem from './ShortApplicationItem.vue';
import ApiService from '../../services/api.service';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'FreelancerApplicationsList',
  components: {
    ShortApplicationItem,
  },
  props: {
    status: {
      type: Number,
      default: 1,
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
