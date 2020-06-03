<template>
  <div>
    <div v-if="!isUserLoggedIn">
      <b-button variant="info"
                block
                class="btn-round mb-4"
                v-if="applyVisible"
                to="/sign-up"
                >
        Apply for job
      </b-button>
    </div>
    <div v-if="isFreelancer">
      <template v-if="isPublished">
        <template v-if="!application">
          <b-button variant="info"
                    block
                    class="btn-round mb-4"
                    v-if="applyVisible"
                    v-b-modal.applicationModal>
            Apply for job
          </b-button>
        </template>
        <template v-else>
          <b-button variant="primary"
                    block
                    class="btn-primary--grey btn-round mb-4"
                    v-if="cancelVisible"
                    @click.prevent="startCancel">
            Cancel job
          </b-button>

          <b-button variant="info"
                    block
                    class="btn-round mb-4"
                    v-if="leaveFeedbackVisible"
                    @click.prevent="startFeedback">
            Leave feedback
          </b-button>
        </template>
      </template>

      <template v-else>
        <p class="mb-3 px-2 text-muted">
          Task applications are only enabled for freelancers with published profiles. Please publish
          your profile.
        </p>

        <b-button variant="primary"
                  to="/profile"
                  block
                  class="btn-round mb-4">
          Go To Profile
        </b-button>
      </template>

      <b-modal id="applicationModal" title="Apply for task" ok-title="Apply" @ok="apply">
        <b-form>
          <textarea-group v-model="letter" label="Message" :rows="10"/>
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
