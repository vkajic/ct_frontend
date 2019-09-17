<template>
  <funnel-container>
    <basic-info-form :freelancer="freelancer"/>
  </funnel-container>
</template>

<script>
import FunnelContainer from '../../components/profile/FunnelContainer.vue';
import BasicInfoForm from '../../components/profile/BasicInfoForm.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'BasicInfo',
  components: {
    BasicInfoForm,
    FunnelContainer,
  },
  computed: {
    freelancer() {
      return this.$store.state.user.user ? this.$store.state.user.user.freelancer : null;
    },
  },
};
</script>
