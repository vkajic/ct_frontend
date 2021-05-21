<template>
  <div>
    <b-link :to="`/my-tasks/${task.id}/edit`"
            class="btn btn-primary btn-block btn-round mt-4 btn-primary--dark"
            v-if="editAllowed">
      {{$t('tasks.details.edit')}}
    </b-link>

    <b-button class="btn btn-secondary btn-block btn-round mt-3"
              @click="deleteTask"
              v-if="editAllowed">
      {{$t('tasks.details.delete')}}
    </b-button>
  </div>
</template>

<script>
import { get } from 'lodash';
import languageRouter from '../mixins/languageRouter';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'TaskDetailsButtons',
  mixins: [languageRouter],
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  computed: {
    /**
     * Is edit allowed on task
     * Edit is allowed only if status is CREATED and current user has created that task
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
        .msgBoxConfirm(this.$t('tasks.details.delete_confirmation'));

      if (confirm) {
        try {
          await this.$store.dispatch('tasks/delete', this.task.id);
          await this.replace('/my-tasks');
          await this.$store.dispatch('ui/showNotification', {
            type: 'success',
            text: this.$t('tasks.details.delete_success'),
          });
        } catch (err) {
          await this.$store.dispatch('ui/showNotification', {
            type: 'danger',
            text: err.response.data.message,
          });
        }
      }
    },
  },
};
</script>

<style scoped>

</style>
