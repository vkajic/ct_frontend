<template>
  <div class="reply d-flex align-items-center">
    <b-button variant="light"
              class="btn-round mr-3"
              @click="reply"
              v-if="replyEnabled">
      {{ $t('applications.reply') }}
    </b-button>
    <b-button variant="info"
              class="btn-round mr-3"
              @click="hire"
              v-if="hireEnabled"
              :disabled="hiring">
      {{ hiring ? $t('applications.hire_loading') : $t('applications.hire') }}
    </b-button>
    <b-button variant="info"
              class="btn-round mr-3"
              @click="leaveFeedback(2)"
              v-if="completeEnabled">
      {{ $t('applications.complete') }}
    </b-button>

    <b-button class="btn-round"
              @click="leaveFeedback(4)"
              v-if="completeEnabled">
      {{ $t('applications.cancel') }}
    </b-button>

    <b-button variant="info"
              class="btn-round"
              @click="leaveFeedback(null)"
              v-if="leaveFeedbackEnabled">
      {{ $t('applications.leave_feedback') }}
    </b-button>
  </div>
</template>

<script>
import ClientButtons from '@/mixins/ClientButtons';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ClientApplicationButtons',
  mixins: [ClientButtons],
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
};
</script>
