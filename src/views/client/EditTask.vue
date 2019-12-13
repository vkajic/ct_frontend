<template>
  <div class="row">
    <div class="col-12 col-lg-9">
      <paper>
        <task-form :task="task" title="Edit job"/>
      </paper>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { get } from 'lodash';
import TaskForm from '../../components/tasks/TaskForm.vue';
import Paper from '../../components/ui/Paper.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'EditTask',
  components: {
    Paper,
    TaskForm,
  },
  computed: {
    ...mapState('tasks', {
      task: state => state.selectedTask,
    }),
    user() {
      return this.$store.state.user.user;
    },
    editAllowed() {
      const client = get(this, '$store.state.user.user.client');
      return this.task.status <= 1 && client && client.id === this.task.postedBy;
    },
  },
  created() {
    const { id } = this.$route.params;

    this.$store.dispatch('tasks/selectTask', id);
  },
};
</script>
