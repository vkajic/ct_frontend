<template>
  <div class="reply d-flex align-items-center">
    <b-button variant="light"
              class="btn-round mr-3"
              @click="reply"
              v-if="replyEnabled">
      Reply
    </b-button>
    <b-button variant="info"
              class="btn-round mr-3"
              @click="hire"
              v-if="hireEnabled"
              :disabled="hiring">
      {{hiring ? 'Hiring...' : 'Hire'}}
    </b-button>
    <b-button variant="info"
              class="btn-round"
              @click="leaveFeedback(2)"
              v-if="completeEnabled">
      Complete
    </b-button>

    <b-button variant="info"
              class="btn-round"
              @click="leaveFeedback(3)"
              v-if="leaveFeedbackEnabled">
      Leave feedback
    </b-button>
  </div>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ClientApplicationButtons',
  data() {
    return {
      hiring: false,
      hired: false,
    };
  },
  props: {
    application: {
      type: Object,
      required: true,
    },
    replyEnabled: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  computed: {
    /**
     * Is hire button enabled
     */
    hireEnabled() {
      return this.application.status === 0 && !this.hired;
    },

    /**
     * Is application completed in any way
     */
    completeEnabled() {
      return this.application.status === 1;
    },

    /**
     * Freelancer canceled the job so client can leave feedback
     */
    leaveFeedbackEnabled() {
      return this.application.status === 3
        && this.application.feedback
        && !this.application.feedback.clientRate;
    },
  },
  methods: {
    /**
     * Clicked on reply button
     */
    reply() {
      this.$emit('select');
    },
    /**
     * Clicked on hire button
     */
    hire() {
      this.$emit('hire');
    },

    /**
     * Leave feedback on application
     */
    leaveFeedback(status) {
      this.$emit('feedback', status);
    },
  },
};
</script>
