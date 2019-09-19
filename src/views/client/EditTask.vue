<template>
  <div class="row">
    <div class="col-2 pt-5">
      <left-menu/>
    </div>
    <div class="col-8">
      <div class="paper px-7 py-6">
        <task-form :task="task" title="Edit job"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TaskForm from '../../components/tasks/TaskForm.vue';
import LeftMenu from '../../components/layout/LeftMenu.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'EditTask',
  components: {
    LeftMenu,
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
