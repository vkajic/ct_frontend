<template>
  <div class="reply d-flex align-items-center">
    <b-button variant="light"
              class="btn-round mr-3"
              @click="reply"
              v-if="replyEnabled">
      {{$t('applications.reply')}}
    </b-button>
    <b-button variant="info"
              class="btn-round mr-3"
              @click="hire"
              v-if="hireEnabled"
              :disabled="hiring">
      {{hiring ? $t('applications.hire_loading') : $t('applications.hire')}}
    </b-button>
    <b-button variant="info"
              class="btn-round mr-3"
              @click="leaveFeedback(2)"
              v-if="completeEnabled">
      {{$t('applications.complete')}}
    </b-button>

    <b-button class="btn-round"
              @click="leaveFeedback(3)"
              v-if="completeEnabled">
      {{$t('applications.cancel')}}
    </b-button>

    <b-button variant="info"
              class="btn-round"
              @click="leaveFeedback(null)"
              v-if="leaveFeedbackEnabled">
      {{$t('applications.leave_feedback')}}
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
</script>
