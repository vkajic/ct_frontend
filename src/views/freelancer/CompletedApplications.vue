<template>
  <freelancer-applications-list :status="2"/>
</template>

<script>
import FreelancerApplicationsList from '../../components/tasks/FreelancerApplicationsList.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'CompletedApplications',
  components: { FreelancerApplicationsList },
};
</script>
