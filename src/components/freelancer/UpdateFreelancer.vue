<template>
  <div>
    <paper class="mb-5">
      <basic-info-preview :freelancer="freelancer">
        <template slot="buttons">
          <b-button variant="info"
                    v-if="publishButtonVisible"
                    class="btn-round"
                    :disabled="publishing"
                    @click="publishProfile">
            {{publishing ? 'Publishing...' : 'Publish profile'}}
          </b-button>
        </template>
      </basic-info-preview>
    </paper>

    <div class="row mb-5">
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

    <paper class="mb-5">
      <newsletter-subscription-form/>
    </paper>

    <paper>
      <delete-user-form/>
    </paper>
  </div>
</template>

<script>
import BasicInfoPreview from '../profile/BasicInfoPreview.vue';
import UpdateBasicInfo from './UpdateBasicInfo.vue';
import ProjectsForm from '../profile/ProjectsForm.vue';
import ExperienceForm from '../profile/ExperienceForm.vue';
import Paper from '../ui/Paper.vue';
import NewsletterSubscriptionForm from '../profile/NewsletterSubscriptionForm.vue';
import DeleteUserForm from '../profile/DeleteUserForm.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'UpdateFreelancer',
  data() {
    return {
      publishing: false,
    };
  },
  components: {
    DeleteUserForm,
    NewsletterSubscriptionForm,
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
    publishButtonVisible() {
      return !this.freelancer.published;
    },
  },
  methods: {
    async publishProfile() {
      this.publishing = true;
      await this.$store.dispatch('user/publishFreelancerProfile');
      this.publishing = false;
      await this.$store.dispatch('ui/showNotification', {
        type: 'success',
        text: 'Profile successfully published',
      });
    },
  },
};
</script>
