<template>
  <div>
    <b-link :to="`/my-tasks/${task.id}/edit`"
            class="btn btn-primary btn-block btn-round mt-4 btn-primary--dark"
            v-if="editAllowed">
      Edit
    </b-link>

    <b-button class="btn btn-secondary btn-block btn-round mt-3"
              @click="deleteTask"
              v-if="editAllowed">
      Delete
    </b-button>
  </div>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
import { get } from 'lodash';

export default {
  name: 'TaskDetailsButtons',
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  computed: {
    /**
     * Is edit allowed on task
     * Edit is allowed only if status is CREATED or HIRED and current user has created that task
     * @return {boolean}
     */
    editAllowed() {
      const client = get(this, '$store.state.user.user.client');
      return this.task.status === 0 && client && client.id === this.task.postedBy;
    },
  },
  methods: {
    async deleteTask() {
      const confirm = await this.$bvModal
        .msgBoxConfirm('Are you sure you want to delete this task?');

      if (confirm) {
        await this.$store.dispatch('tasks/delete', this.task.id);
        await this.$router.replace('/my-tasks');
        await this.$store.dispatch('ui/showNotification', {
          type: 'success',
          text: 'Task deleted successfully!',
        });
      }
    },
  },
};
</script>

<style scoped>

</style>
