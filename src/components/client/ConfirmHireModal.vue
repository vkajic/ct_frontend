<template>
  <b-modal :visible="isVisible"
           title="Hire Freelancer"
           @close="close"
           @cancel="close"
           @hidden="close"
           @ok.prevent="hireFreelancer"
           ok-title="Confirm">
    Are you sure you want to hire
    <b>{{application.freelancer.name}}</b>
    for job
    <b>{{task.title}}?</b>
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
    task: {
      type: Object,
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
    hireFreelancer() {
      this.$emit('hire', this.application);
    },
  },
};
</script>
