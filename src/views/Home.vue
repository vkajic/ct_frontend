<template>
  <div>
    <tasks-search v-if="activeRole === 'freelancer'"/>
    <freelancers-search v-if="activeRole === 'client'"/>
  </div>
</template>

<script>
import TasksSearch from '../components/search/TasksSearch.vue';
import FreelancersSearch from '../components/client/FreelancersSearch.vue';

export default {
  name: 'home',
  components: {
    FreelancersSearch,
    TasksSearch,
  },
  computed: {
    activeRole() {
      return this.$store.state.user.activeRole;
    },
  },
};
</script>
