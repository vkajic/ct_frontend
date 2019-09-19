<template>
  <div class="tasks-group">
    <div class="d-flex align-items-end mb-4">
      <!-- <h4 class="mb-0 pr-4">Development Jobs</h4> -->
      <!-- <span>Latest post 4 minutes ago</span> -->
    </div>

    <div>
      <search-task-item v-for="(task, index) in tasks" :key="index" :task="task"/>
    </div>

    <!-- <a href="#"><u>See all Development Jobs</u></a> -->
  </div>
</template>

<script>
import SearchTaskItem from '../tasks/SearchTaskItem.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'TasksGroup',
  components: { SearchTaskItem },
  props: {
    tasks: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
