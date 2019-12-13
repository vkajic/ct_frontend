<template>
  <div class="row">
    <div class="col-12 col-lg-9">
      <update-client v-if="activeRole === 'client'"/>
      <update-freelancer v-if="activeRole === 'freelancer'"/>
    </div>
  </div>
</template>

<script>
import UpdateClient from '../../components/client/UpdateClient.vue';
import UpdateFreelancer from '../../components/freelancer/UpdateFreelancer.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'UpdateProfile',
  components: {
    UpdateFreelancer,
    UpdateClient,
  },
  computed: {
    activeRole() {
      return this.$store.state.user.activeRole;
    },
  },
};
</script>
