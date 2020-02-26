<template>
  <div class="row">
    <div class="col-12 col-lg-9">
      <freelancer-profile-preview :freelancer="profile" v-if="activeRole === 'freelancer'"/>
      <client-profile-preview :client="profile" v-if="activeRole === 'client'"/>
    </div>
  </div>
</template>

<script>
import FreelancerProfilePreview from '../../components/freelancer/FreelancerProfilePreview.vue';
import ClientProfilePreview from '../../components/client/ClientProfilePreview.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'MyPublicProfile',
  components: {
    ClientProfilePreview,
    FreelancerProfilePreview,
  },
  computed: {
    activeRole() {
      return this.$store.state.user.activeRole;
    },
    profile() {
      return this.activeRole === 'freelancer'
        ? this.$store.state.user.user.freelancer
        : this.$store.state.user.user.client;
    },
  },
};
</script>
