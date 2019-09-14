<template>
  <funnel-container>
    <projects-form/>
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
};
</script>
