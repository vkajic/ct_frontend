<template>
  <div>
    <div v-if="!isUserLoggedIn">
      <b-button variant="info"
                block
                class="btn-round mb-4"
                v-if="applyVisible"
                :to="signUpUrl">
        {{ $t('freelancers.apply_for_job') }}
      </b-button>
    </div>
    <div v-if="isFreelancer">
      <template v-if="!isConfirmed">
        <p class="mb-4 px-2 text-muted">{{ $t('freelancers.confirmed_warning') }}</p>
      </template>
      <template v-else>
        <template v-if="isPublished">
          <template v-if="!application">
            <b-button variant="info"
                      block
                      class="btn-round mb-4"
                      v-if="applyVisible"
                      v-b-modal.applicationModal>
              {{ $t('freelancers.apply_for_job') }}
            </b-button>
          </template>
          <template v-else>
            <b-button variant="primary"
                      block
                      class="btn-primary--grey btn-round mb-4"
                      v-if="cancelVisible"
                      @click.prevent="startCancel">{{ $t('freelancers.cancel_job') }}
            </b-button>

            <b-button variant="info"
                      block
                      class="btn-round mb-4"
                      v-if="leaveFeedbackVisible"
                      @click.prevent="startFeedback">{{ $t('freelancers.leave_feedback') }}
            </b-button>
          </template>
        </template>

        <template v-else>
          <p class="mb-3 px-2 text-muted">{{ $t('freelancers.published_warning') }}</p>

          <b-button variant="primary"
                    to="/profile"
                    block
                    class="btn-round mb-4">{{ $t('freelancers.go_to_profile') }}
          </b-button>
        </template>
      </template>

      <b-modal id="applicationModal" :title="$t('freelancers.apply_for_job')"
               :ok-title="$t('freelancers.apply_for_job')" @ok="apply">
        <b-form>
          <textarea-group v-model="letter" :label="$t('freelancers.message')" :rows="10"/>
        </b-form>
      </b-modal>

      <feedback-modal @save="saveFeedback"/>
    </div>
  </div>
</template>

<script>
import TextareaGroup from '../form/TextareaGroup.vue';
import FeedbackModal from '../feedback/FeedbackModal.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'FreelancerTaskButtons',
  components: {
    FeedbackModal,
    TextareaGroup,
  },
  data() {
    return {
      letter: null,
    };
  },
  props: {
    application: {
      type: Object,
      default: null,
    },
    task: {
      type: Object,
      default: null,
    },
  },
  computed: {
    isFreelancer() {
      return this.$store.state.user.activeRole === 'freelancer';
    },
    isUserLoggedIn() {
      return !!this.$store.state.user.user;
    },

    /**
     * Is freelancer profile published
     */
    isPublished() {
      return this.$store.state.user.user.freelancer.published;
    },

    /**
     * Is user confirmed
     */
    isConfirmed() {
      return this.$store.state.user.user.confirmed;
    },

    /**
     * Checks if user can apply on task
     * @return {boolean}
     */
    applyVisible() {
      return !this.application && this.task && this.task.status !== 1;
    },

    /**
     * Is cancel button visible
     * @return {boolean}
     */
    cancelVisible() {
      return this.application.status === 1;
    },

    /**
     * Is leave feedback button visible
     * @return {boolean}
     */
    leaveFeedbackVisible() {
      return (this.application.status === 2 || this.application.status === 3)
          && this.application.feedback
          && !this.application.feedback.freelancerCreatedAt;
    },

    signUpUrl() {
      const { lang } = this.$route.params;
      return `/${lang}/sign-up`;
    },
  },
  methods: {
    apply() {
      this.$emit('apply', this.letter);
    },

    startCancel() {
      this.$store.commit('tasks/openFeedbackModal', {
        applicationId: this.application.id,
        status: 3,
      });
    },

    /**
     * Leave feedback
     */
    async startFeedback() {
      this.$store.commit('tasks/openFeedbackModal', {
        applicationId: this.application.id,
        status: null,
      });
    },

    /**
     * Save feedback data
     * @param formData
     */
    saveFeedback(formData) {
      this.$emit('feedback', formData);
    },
  },
};
</script>
