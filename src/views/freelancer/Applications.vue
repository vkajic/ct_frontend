<template>
  <freelancer-applications-list :status="statuses"/>
</template>

<script>
import FreelancerApplicationsList from '../../components/tasks/FreelancerApplicationsList.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Applications',
  components: {
    FreelancerApplicationsList,
  },
  data() {
    return {
      statuses: [0],
    };
  },
};
</script>
