<template>
  <div>
    <funnel-container class="mb-5">
      <basic-info-preview/>
    </funnel-container>

    <div class="row">
      <div class="col-6 offset-3">
        <b-tabs content-class="py-4">
          <b-tab title="My profile" active></b-tab>
          <b-tab title="Projects"></b-tab>
          <b-tab title="Experience">
            <experience-preview/>
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import FunnelContainer from '../../components/profile/FunnelContainer.vue';
import BasicInfoPreview from '../../components/profile/BasicInfoPreview.vue';
import ExperiencePreview from '../../components/profile/ExperiencePreview.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Preview',
  components: {
    ExperiencePreview,
    BasicInfoPreview,
    FunnelContainer,
  },
};
</script>
