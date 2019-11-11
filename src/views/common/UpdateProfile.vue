<template>
  <page-wrapper :menu-width="2">
    <update-client v-if="activeRole === 'client'"/>
    <update-freelancer v-if="activeRole === 'freelancer'"/>
  </page-wrapper>
</template>

<script>
import PageWrapper from '../../components/ui/PageWrapper.vue';
import UpdateClient from '../../components/client/UpdateClient.vue';
import UpdateFreelancer from '../../components/freelancer/UpdateFreelancer.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'UpdateProfile',
  components: { UpdateFreelancer, UpdateClient, PageWrapper },
  computed: {
    activeRole() {
      return this.$store.state.user.activeRole;
    },
  },
};
</script>
