<template>
  <funnel-container>
    <div class="row">
      <div class="col-12">
        <experience-form :freelancer="freelancer"/>
      </div>
    </div>
  </funnel-container>
</template>

<script>
import FunnelContainer from '../../components/profile/FunnelContainer.vue';
import ExperienceForm from '../../components/profile/ExperienceForm.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Experience',
  components: {
    ExperienceForm,
    FunnelContainer,
  },
  computed: {
    freelancer() {
      return this.$store.state.user.user ? this.$store.state.user.user.freelancer : null;
    },
  },
};
</script>
