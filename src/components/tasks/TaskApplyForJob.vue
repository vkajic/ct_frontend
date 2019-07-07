<template>
  <div class="row" v-if="canApply">
    <div class="col-md-12 text-center">
      <button class="btn btn-blue" @click="applyForJob" :disabled="applying">
        Apply
      </button>
    </div>
  </div>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'TaskApplyForJob',
  props: {
    task: {
      type: Object,
      required: true,
    },
    applications: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      applying: false,
    };
  },
  methods: {
    async applyForJob() {
      try {
        this.applying = true;

        await this.$store.dispatch('tasks/applyForTask', this.task.id);

        this.$store.dispatch('ui/showNotification', {
          text: 'You successfully applied for this job. Thanks!',
        });

        this.applying = false;
      } catch (err) {
        this.$store.dispatch('ui/showNotification', {
          text: err.response.data.message,
          type: 'danger',
        });

        this.applying = false;
      }
    },
  },
  computed: {
    /**
     * Check if current has is already applied for this job and if user is task author
     * @return {*|boolean}
     */
    canApply() {
      return this.$store.getters['tasks/canApplyForTask'];
    },
  },
};
</script>
