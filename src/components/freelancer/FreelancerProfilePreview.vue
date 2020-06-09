<template>
  <div>
    <paper class="mb-5">
      <basic-info-preview :freelancer="freelancer"
                          :skills-clickable="false">
      </basic-info-preview>
    </paper>

    <div class="row">
      <div class="col-12 col-lg-10 offset-lg-1">
        <b-tabs content-class="py-4">
          <b-tab title="Bio" active>
            <div v-html="freelancer.bio"></div>
          </b-tab>
          <b-tab title="Projects">
            <projects-preview :projects="freelancer.projects"/>
          </b-tab>
          <b-tab title="Experience">
            <experience-preview :items="freelancer.workExperiences"
                                :resume="freelancer.resume"/>
          </b-tab>
          <b-tab title="Feedbacks">
            <freelancer-feedbacks :freelancer-id="freelancer.id"/>
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Paper from '../ui/Paper.vue';
import BasicInfoPreview from '../profile/BasicInfoPreview.vue';
import ProjectsPreview from './ProjectsPreview.vue';
import ExperiencePreview from '../profile/ExperiencePreview.vue';
import FreelancerFeedbacks from './FreelancerFeedbacks.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'FreelancerProfilePreview',
  components: {
    FreelancerFeedbacks,
    ExperiencePreview,
    ProjectsPreview,
    BasicInfoPreview,
    Paper,
  },
  props: {
    freelancer: {
      type: Object,
      required: true,
    },
  },
};
</script>
