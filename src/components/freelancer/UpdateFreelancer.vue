<template>
  <div>
    <paper class="mb-5">
      <basic-info-preview :freelancer="freelancer"/>
    </paper>

    <div class="row">
      <div class="col-12 col-lg-10 offset-lg-1">
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
import Paper from '../ui/Paper.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'UpdateFreelancer',
  components: {
    Paper,
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
