<template>
  <div class="row">
    <div class="col-12 col-lg-9">
      <template v-if="freelancer">
        <paper class="mb-5">
          <basic-info-preview :freelancer="freelancer"
                              :skills-clickable="true"
                              @skill-click="skillClicked">
            <template slot="buttons">
              <b-button variant="info"
                        v-if="loggedIn"
                        class="btn-round"
                        @click="openInviteModal">
                {{$t('freelancer_info.invite_button')}}
              </b-button>
            </template>
          </basic-info-preview>
        </paper>

        <div class="row">
          <div class="col-12 col-lg-10 offset-lg-1">
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
          </div>
        </div>
      </template>
    </div>

    <invite-to-job-modal v-if="freelancer && loggedIn"
                         :freelancer="freelancer"
                         :active="inviteActive"
                         @close="closeInviteModal"/>
  </div>
</template>

<script>
import apiService from '../../services/api.service';
import BasicInfoPreview from '../../components/profile/BasicInfoPreview.vue';
import ExperiencePreview from '../../components/profile/ExperiencePreview.vue';
import ProjectsPreview from '../../components/freelancer/ProjectsPreview.vue';
import InviteToJobModal from '../../components/client/InviteToJobModal.vue';
import Paper from '../../components/ui/Paper.vue';
import FreelancerFeedbacks from '../../components/freelancer/FreelancerFeedbacks.vue';
import languageRouter from '../../components/mixins/languageRouter';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Freelancer',
  components: {
    FreelancerFeedbacks,
    Paper,
    InviteToJobModal,
    ProjectsPreview,
    ExperiencePreview,
    BasicInfoPreview,
  },
  mixins: [languageRouter],
  data() {
    return {
      freelancer: null,
      inviteActive: null,
      feedbacks: [],
    };
  },
  created() {
    this.$store.commit('ui/showLoader');
    this.loadFreelancer();
    this.loadFeedbacks();
  },
  computed: {
    /**
     * Is user logged in
     * @return {Boolean}
     */
    loggedIn() {
      return !!this.$store.state.user.user;
    },
  },
  methods: {
    /**
     * Open invite modal
     */
    openInviteModal() {
      this.inviteActive = true;
    },

    /**
     * Close invite modal
     */
    closeInviteModal() {
      this.inviteActive = false;
    },

    /**
     * Skill tag is clicked
     * Set skill and category and move to freelancers page
     * @param $event
     */
    async skillClicked($event) {
      await this.$store.dispatch('freelancers/setSkillCategory', $event);
      await this.push('/freelancers');
    },

    /**
     * Load freelancer
     * @return {Promise<void>}
     */
    async loadFreelancer() {
      const { id } = this.$route.params;
      try {
        const freelancer = await apiService.get(`/freelancers/${id}`);
        this.freelancer = freelancer.data.data;
        this.$store.commit('ui/hideLoader');
      } catch (e) {
        if (e.response && e.response.status === 404) {
          this.replace({ name: 'notFoundPage' });
        }
      }
    },

    /**
     * Load feedbacks
     * @return {Promise<void>}
     */
    async loadFeedbacks() {
      const { id } = this.$route.params;

      try {
        apiService.get(`/freelancers/${id}/feedbacks`)
          .then((res) => {
            this.feedbacks = res.data.data;
          });
      } catch (e) {
        //
      }
    },
  },
  metaInfo() {
    return {
      title: this.freelancer ? this.freelancer.name : '',
    };
  },
};
</script>
