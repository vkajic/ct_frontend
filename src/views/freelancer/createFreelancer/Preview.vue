<template>
  <div>
    <funnel-container class="mb-5">
      <basic-info-preview :freelancer="freelancer">
        <template slot="buttons">
          <b-button variant="info"
                    class="btn-round"
                    @click="browse">
            {{ $t('freelancers.browse_jobs') }}
          </b-button>
        </template>
      </basic-info-preview>
    </funnel-container>

    <div class="row">
      <div class="col-12 col-lg-6 offset-lg-3">
        <b-tabs content-class="py-4">
          <b-tab :title="$t('freelancers.my_profile')" active>
            {{ freelancer.bio }}
          </b-tab>
          <b-tab :title="$t('freelancers.projects')"></b-tab>
          <b-tab :title="$t('freelancers.experience')">
            <experience-preview :items="freelancer.workExperiences"/>
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import FunnelContainer from '../../../components/profile/FunnelContainer.vue';
import BasicInfoPreview from '../../../components/profile/BasicInfoPreview.vue';
import ExperiencePreview from '../../../components/profile/ExperiencePreview.vue';
import languageRouter from '../../../components/mixins/languageRouter';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Preview',
  components: {
    ExperiencePreview,
    BasicInfoPreview,
    FunnelContainer,
  },
  mixins: [languageRouter],
  data() {
    return {
      publishing: false,
    };
  },
  computed: {
    freelancer() {
      return this.$store.state.user.user && this.$store.state.user.user.freelancer
        ? this.$store.state.user.user.freelancer
        : {};
    },
  },
  methods: {
    browse() {
      this.replace('/');
    },
  },
};
</script>
