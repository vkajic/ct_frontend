<template>
  <div>
    <client-threads v-if="activeRole === 'client'"/>
    <freelancer-threads v-if="activeRole === 'freelancer'"/>
  </div>
</template>

<script>
import ClientThreads from '../../components/tasks/chat/ClientThreads.vue';
import FreelancerThreads from '../../components/tasks/chat/FreelancerThreads.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Chats',
  components: {
    FreelancerThreads,
    ClientThreads,
  },
  computed: {
    activeRole() {
      return this.$store.state.user.activeRole;
    },
  },
};
</script>
