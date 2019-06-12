<template>
  <div class="tasks">
    <div class="row">
      <div class="col-md-12 center">
        <h1>My Tasks</h1>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4">
        <my-posted-tasks/>
      </div>
      <div class="col-md-4">
        <tasks-working-on/>
      </div>
      <div class="col-md-4">
        <tasks-reviewing/>
      </div>
    </div>
  </div>
</template>

<script>
import MyPostedTasks from '../components/tasks/MyPostedTasks.vue';
import TasksWorkingOn from '../components/tasks/TasksWorkingOn.vue';
import TasksReviewing from '../components/tasks/TasksReviewing.vue';

export default {
  name: 'home',
  components: {
    TasksReviewing,
    TasksWorkingOn,
    MyPostedTasks,
  },
};
</script>
