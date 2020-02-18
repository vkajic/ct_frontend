<template>
  <freelancer-applications-list :status="1"/>
</template>

<script>
import FreelancerApplicationsList from '../../components/tasks/FreelancerApplicationsList.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'InProgress',
  components: {
    FreelancerApplicationsList,
  },
};
</script>
