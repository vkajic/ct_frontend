<template>
  <div v-if="deletable">
    <b-button v-b-modal.confirmation
              variant="danger"
              :disabled="deleting">
      Delete task
    </b-button>

    <b-modal id="confirmation" title="Are you sure?" @ok="deleteTask">
      <p>Are you sure you want to delete this task?</p>
    </b-modal>
  </div>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'TaskDeleteForm',
  props: {
    task: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      deleting: false,
    };
  },
  methods: {
    async deleteTask() {
      try {
        this.deleting = true;
        this.$store.commit('ui/toggleLoader');
        await this.$store.dispatch('tasks/delete', this.task.id);
        this.$store.commit('ui/toggleLoader');
        this.deleting = false;
        this.$router.replace('/');
      } catch (err) {
        this.$store.dispatch('ui/showNotification', {
          type: 'danger',
          text: `Something went wrong! ${err.response.data.message}`,
        });
        this.$store.commit('ui/toggleLoader');
        this.deleting = false;
      }
    },
  },
  computed: {
    /**
     * Check if task is deletable
     * Only if user is owner of task
     * @return {boolean}
     */
    deletable() {
      return this.$store.state.user.user && this.$store.state.user.user.id === this.task.postedBy;
    },
  },
};
</script>
