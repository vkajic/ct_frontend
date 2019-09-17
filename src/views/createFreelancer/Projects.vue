<template>
  <funnel-container>
    <projects-form :freelancer="freelancer"/>
  </funnel-container>
</template>

<script>
import FunnelContainer from '../../components/profile/FunnelContainer.vue';
import ProjectsForm from '../../components/profile/ProjectsForm.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Projects',
  components: {
    ProjectsForm,
    FunnelContainer,
  },
  computed: {
    freelancer() {
      return this.$store.state.user.user ? this.$store.state.user.user.freelancer : null;
    },
  },
};
</script>
