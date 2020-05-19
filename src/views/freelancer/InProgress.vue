<template>
  <freelancer-applications-list :status="statuses"/>
</template>

<script>
import FreelancerApplicationsList from '../../components/tasks/FreelancerApplicationsList.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'InProgress',
  components: {
    FreelancerApplicationsList,
  },
  data() {
    return {
      statuses: [1],
    };
  },
};
</script>
