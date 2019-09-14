<template>
  <div class="tasks-group">
    <div class="d-flex align-items-end mb-4">
      <h4 class="mb-0 pr-4">Development Jobs</h4>
      <span>Latest post 4 minutes ago</span>
    </div>

    <div>
      <short-task-item/>
      <short-task-item/>
      <short-task-item/>
      <short-task-item/>
    </div>

    <a href="#"><u>See all Development Jobs</u></a>
  </div>
</template>

<script>
import ShortTaskItem from '../tasks/ShortTaskItem.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'TasksGroup',
  components: { ShortTaskItem },
};
</script>
