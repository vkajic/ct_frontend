<template>
  <freelancer-applications-list :status="0"/>
</template>

<script>
import FreelancerApplicationsList from '../../components/tasks/FreelancerApplicationsList.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Applications',
  components: {
    FreelancerApplicationsList,
  },
};
</script>
