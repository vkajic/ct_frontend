<template>
  <div>
    <div class="paper px-7 py-6 mb-5">
      <basic-info-preview :freelancer="freelancer"/>
    </div>

    <div class="row">
      <div class="col-10 offset-1">
        <b-tabs content-class="py-4">
          <b-tab title="Basic Info" active>
            <update-basic-info :freelancer="freelancer"/>
          </b-tab>
          <b-tab title="Projects">
            <projects-form :freelancer="freelancer"
                           :skip-enabled="false"
                           :redirection-enabled="false"
                           save-button-text="Save projects"/>
          </b-tab>
          <b-tab title="Experience">
            <experience-form :freelancer="freelancer"
                             :skip-enabled="false"
                             :redirection-enabled="false"
                             save-button-text="Save experience"/>
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import BasicInfoPreview from '../profile/BasicInfoPreview.vue';
import UpdateBasicInfo from './UpdateBasicInfo.vue';
import ProjectsForm from '../profile/ProjectsForm.vue';
import ExperienceForm from '../profile/ExperienceForm.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'UpdateFreelancer',
  components: {
    ExperienceForm,
    ProjectsForm,
    UpdateBasicInfo,
    BasicInfoPreview,
  },
  computed: {
    freelancer() {
      return this.$store.state.user.user ? this.$store.state.user.user.freelancer : null;
    },
  },
};
</script>
