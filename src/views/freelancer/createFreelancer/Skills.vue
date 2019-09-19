<template>
  <funnel-container>
    <div class="row">
      <div class="col-12">
        <skills-form :freelancer="freelancer"/>
      </div>
    </div>
  </funnel-container>
</template>

<script>
import FunnelContainer from '../../../components/profile/FunnelContainer.vue';
import SkillsForm from '../../../components/profile/SkillsForm.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Skills',
  components: {
    SkillsForm,
    FunnelContainer,
  },
  computed: {
    freelancer() {
      return this.$store.state.user.user ? this.$store.state.user.user.freelancer : null;
    },
  },
};
</script>
