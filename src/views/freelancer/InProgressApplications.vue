<template>
  <freelancer-applications-list :status="1"/>
</template>

<script>
import FreelancerApplicationsList from '../../components/tasks/FreelancerApplicationsList.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'InProgressApplications',
  components: { FreelancerApplicationsList },
};
</script>
