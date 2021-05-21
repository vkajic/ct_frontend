<template>
  <div>
    <b-link :to="`/my-tasks/${task.id}/edit`"
            class="btn btn-primary btn-block btn-round mt-4 btn-primary--dark"
            v-if="editAllowed">
      {{ $t('tasks.details.edit') }}
    </b-link>

    <b-button class="btn btn-secondary btn-block btn-round mt-3"
              @click="deleteTask"
              v-if="editAllowed">
      {{ $t('tasks.details.delete') }}
    </b-button>

    <close-task-button v-if="statusUpdateButtonVisible" :task="task" @close="close" class="mt-3"/>
    <reopen-task-button v-if="statusUpdateButtonVisible"
                        :task="task"
                        @reopen="reopen"
                        class="mt-3"/>
  </div>
</template>

<script>
import { get } from 'lodash';
import CloseTaskButton from '@/components/client/CloseTaskButton.vue';
import ReopenTaskButton from '@/components/client/ReopenTaskButton.vue';
import languageRouter from '@/components/mixins/languageRouter';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'TaskDetailsButtons',
  components: {
    ReopenTaskButton,
    CloseTaskButton,
  },
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
      return this.statusUpdateButtonVisible && !this.task.applications.length;
    },

    statusUpdateButtonVisible() {
      const client = get(this, '$store.state.user.user.client');
      return client && client.id === this.task.postedBy;
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

    /**
     * Reopen task again
     */
    async reopen() {
      try {
        await this.$store.dispatch('tasks/reopen', this.task);
        await this.$store.dispatch('ui/showNotification', {
          type: 'success',
          text: this.$t('tasks.opened_success'),
        });
      } catch (err) {
        this.$store.dispatch('ui/showNotification', {
          type: 'danger',
          text: this.$t('common.error'),
        });
      }
    },

    /**
     * Close task to applications
     */
    async close() {
      try {
        await this.$store.dispatch('tasks/close', this.task);
        await this.$store.dispatch('ui/showNotification', {
          type: 'success',
          text: this.$t('tasks.closed_success'),
        });
      } catch (err) {
        this.$store.dispatch('ui/showNotification', {
          type: 'danger',
          text: this.$t('common.error'),
        });
      }
    },
  },
};
</script>
