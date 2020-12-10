<template>
  <b-tabs content-class="py-4">
    <b-tab :title="$t('freelancer_info.bio')" active>
      <div v-html="freelancer.bio"></div>
    </b-tab>
    <b-tab :title="$t('freelancer_info.projects')">
      <projects-preview :projects="freelancer.projects"/>
    </b-tab>
    <b-tab :title="$t('freelancer_info.experience')">
      <experience-preview :items="freelancer.workExperiences"
                          :resume="freelancer.resume"/>
    </b-tab>
    <b-tab :title="$t('freelancer_info.feedbacks')">
      <freelancer-feedbacks :freelancer-id="freelancer.id"/>
    </b-tab>
  </b-tabs>
</template>

<script>
import ProjectsPreview from '@/components/freelancer/ProjectsPreview.vue';
import ExperiencePreview from '@/components/profile/ExperiencePreview.vue';
import FreelancerFeedbacks from '@/components/freelancer/FreelancerFeedbacks.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'FreelancerProfileTabs',
  props: {
    freelancer: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    FreelancerFeedbacks,
    ExperiencePreview,
    ProjectsPreview,
  },
};
</script>

<style scoped>

</style>
