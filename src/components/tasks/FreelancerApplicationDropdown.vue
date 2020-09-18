<template>
  <div>
    <b-dropdown boundary="window" variant="link" right class="client-buttons"
                toggle-class="py-0 px-1" no-caret>
      <template v-slot:button-content>
        <menu-icon/>
      </template>
      <b-dropdown-item-button variant="danger" v-if="cancelVisible" @click="startCancel"
                              class="text-center">
        {{ $t('freelancers.cancel_job') }}
      </b-dropdown-item-button>

      <b-dropdown-item-button variant="danger" v-if="leaveFeedbackVisible" @click="startFeedback"
                              class="text-center">
        {{ $t('freelancers.leave_feedback') }}
      </b-dropdown-item-button>
    </b-dropdown>
  </div>
</template>

<script>
import { MenuIcon } from 'vue-feather-icons';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'FreelancerApplicationDropdown',
  components: {
    MenuIcon,
  },
  props: {
    application: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
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
  },
};
</script>
