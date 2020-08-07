<template>
  <div class="row">
    <div class="col-12 col-lg-9">
      <paper>
        <task-form :title="$t('tasks.form.title')"/>
      </paper>
    </div>
  </div>
</template>

<script>
import TaskForm from '../../components/tasks/TaskForm.vue';
import Paper from '../../components/ui/Paper.vue';
import languageRouter from '../../components/mixins/languageRouter';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'CreateTask',
  components: {
    Paper,
    TaskForm,
  },
  mixins: [languageRouter],
  created() {
    if (!this.$store.state.user.user.client.name) {
      this.$store.dispatch('ui/showNotification', {
        type: 'danger',
        text: this.$t('tasks.form.warning'),
      });
      this.replace('/profile');
    }
  },
};
</script>
