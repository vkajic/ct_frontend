<template>
  <div class="row">
    <div class="col-3">
      <freelancer-menu/>
    </div>
    <div class="col-6">
      <my-jobs-heading class="mb-5"/>
      <my-jobs-list v-if="jobs.length"/>

      <div v-if="!jobs.length">
        <div class="h1 mb-4">
          No active jobs atm...
        </div>
        <router-link to="/search"><u>Browse</u></router-link>
      </div>
    </div>
  </div>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
import MyJobsList from '../components/tasks/MyJobsList.vue';
import FreelancerMenu from '../components/FreelancerMenu.vue';
import MyJobsHeading from '../components/tasks/MyJobsHeading.vue';

export default {
  name: 'MyJobs',
  components: {
    MyJobsHeading,
    FreelancerMenu,
    MyJobsList,
  },
  computed: {
    jobs() {
      return [1];
    },
  },
};
</script>
