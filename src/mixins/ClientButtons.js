export default {
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
        && !this.application.feedback.clientCreatedAt;
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
