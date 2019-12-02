<template>
  <page-wrapper>
    <div class="row">
      <div class="col-12 col-lg-7">
        <short-application-item v-for="(a, i) in applications" :key="i" :application="a"/>

        <div v-if="!applications.length && !loading">
          <div class="h1 mb-4">
            You have no applications atm...
          </div>
          <router-link to="/tasks"><u>Browse</u></router-link>
        </div>
      </div>
    </div>
  </page-wrapper>
</template>

<script>
import ApiService from '../../services/api.service';
import ShortApplicationItem from '../../components/tasks/ShortApplicationItem.vue';
import PageWrapper from '../../components/ui/PageWrapper.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Applications',
  components: {
    PageWrapper,
    ShortApplicationItem,
  },
  data() {
    return {
      applications: [],
      loading: false,
    };
  },
  mounted() {
    this.loading = true;
    ApiService.get('/applications')
      .then((res) => {
        this.applications = res.data.data;
        this.loading = false;
      });
  },
};
</script>
