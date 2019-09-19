<template>
  <div class="task row">
    <div class="col-3 pt-5">
      <left-menu/>
    </div>
    <div class="col-6">
      <short-application-item v-for="(a, i) in applications" :key="i" :application="a"/>

      <div v-if="!applications.length && !loading">
        <div class="h1 mb-4">
          You have no applications atm...
        </div>
        <router-link to="/tasks"><u>Browse</u></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import LeftMenu from '../../components/layout/LeftMenu.vue';
import ApiService from '../../services/api.service';
import ShortApplicationItem from '../../components/tasks/ShortApplicationItem.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Applications',
  components: {
    ShortApplicationItem,
    LeftMenu,
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
