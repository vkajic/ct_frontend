<template>
  <page-wrapper :menu-width="2">
    <div class="paper px-7 py-6">
      <task-form :task="task" title="Edit job"/>
    </div>
  </page-wrapper>
</template>

<script>
import { mapState } from 'vuex';
import { get } from 'lodash';
import TaskForm from '../../components/tasks/TaskForm.vue';
import PageWrapper from '../../components/ui/PageWrapper.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'EditTask',
  components: {
    PageWrapper,
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
