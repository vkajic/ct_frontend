<template>
  <funnel-container>
    <div class="row">
      <div class="col-12">
        <experience-form/>
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
};
</script>
