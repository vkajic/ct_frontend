<template>
  <freelancer-applications-list :status="statuses"/>
</template>

<script>
import FreelancerApplicationsList from '../../components/tasks/FreelancerApplicationsList.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'CompletedApplications',
  components: { FreelancerApplicationsList },
  data() {
    return {
      statuses: [2, 3, 4],
    };
  },
};
</script>
