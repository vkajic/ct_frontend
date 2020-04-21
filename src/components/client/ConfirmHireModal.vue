<template>
  <b-modal :visible="isVisible"
           title="Hire Freelancer"
           ok-title="Confirm">
    Are you sure you want to hire
    <b>{{application.freelancer.name}}</b> for job <b>{{application.task.title}}?</b>
  </b-modal>
</template>

<script>

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ConfirmHireModal',
  props: {
    isVisible: {
      type: Boolean,
    },
    application: {
      type: Object,
    },
  },
  data() {
    return {
      sending: false,
      formData: {
        rate: 0,
        message: null,
      },
    };
  },
};
</script>
