<template>
  <page-wrapper :menu-width="2">
    <template v-if="freelancer">
      <div class="paper px-7 py-6 mb-5">
        <basic-info-preview :freelancer="freelancer">
          <template slot="buttons">
            <b-button variant="info"
                      class="btn-round"
                      @click="openInviteModal">
              Invite to Job
            </b-button>
          </template>
        </basic-info-preview>
      </div>

      <div class="row">
        <div class="col-10 offset-1">
          <b-tabs content-class="py-4">
            <b-tab title="Projects" active>
              <projects-preview :projects="freelancer.projects"/>
            </b-tab>
            <b-tab title="Experience">
              <experience-preview :items="freelancer.workExperiences" :resume="freelancer.resume"/>
            </b-tab>
          </b-tabs>
        </div>
      </div>
    </template>

    <invite-to-job-modal v-if="freelancer"
                         :freelancer="freelancer"
                         :active="inviteActive"
                         @invite="invite"
                         @close="closeInviteModal"/>
  </page-wrapper>
</template>

<script>
import apiService from '../../services/api.service';
import PageWrapper from '../../components/ui/PageWrapper.vue';
import BasicInfoPreview from '../../components/profile/BasicInfoPreview.vue';
import ExperiencePreview from '../../components/profile/ExperiencePreview.vue';
import ProjectsPreview from '../../components/freelancer/ProjectsPreview.vue';
import InviteToJobModal from '../../components/client/InviteToJobModal.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Freelancer',
  components: {
    InviteToJobModal,
    ProjectsPreview,
    ExperiencePreview,
    BasicInfoPreview,
    PageWrapper,
  },
  data() {
    return {
      freelancer: null,
      inviteActive: null,
    };
  },
  created() {
    this.$store.commit('ui/showLoader');
    apiService.get(`/freelancers/${this.id}`)
      .then((res) => {
        this.freelancer = res.data.data;
        this.$store.commit('ui/hideLoader');
      });
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    openInviteModal() {
      this.inviteActive = true;
    },
    closeInviteModal() {
      this.inviteActive = false;
    },
    invite(e) {
      console.log(e);
    },
  },
};
</script>
