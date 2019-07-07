<template>
  <div class="task">
    <div class="row">
      <div class="col-md-2">
        <back-button/>
      </div>
      <div class="col-md-8 center">
        <h1>Edit task</h1>
      </div>
      <div class="col-md-2"></div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="block newtask">
          <task-form :task="task"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TaskForm from '../components/tasks/TaskForm.vue';
import BackButton from '../components/BackButton.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'EditTask',
  components: {
    BackButton,
    TaskForm,
  },
  computed: {
    ...mapState('tasks', {
      task: state => state.selectedTask,
    }),
    user() {
      return this.$store.state.user.user;
    },
    canEdit() {
      return this.user && this.user.id === this.task.postedBy && !this.task.published;
    },
  },
  created() {
    const { id } = this.$route.params;

    this.$store.dispatch('tasks/selectTask', id);
  },
};
</script>
