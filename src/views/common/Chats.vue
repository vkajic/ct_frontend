<template>
  <page-wrapper>
    <client-threads v-if="activeRole === 'client'"/>
    <freelancer-threads v-if="activeRole === 'freelancer'"/>
  </page-wrapper>
</template>

<script>
import ClientThreads from '../../components/tasks/chat/ClientThreads.vue';
import PageWrapper from '../../components/ui/PageWrapper.vue';
import FreelancerThreads from '../../components/tasks/chat/FreelancerThreads.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Chats',
  components: {
    FreelancerThreads,
    PageWrapper,
    ClientThreads,
  },
  computed: {
    activeRole() {
      return this.$store.state.user.activeRole;
    },
  },
};
</script>
