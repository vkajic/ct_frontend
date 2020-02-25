<template>
  <div class="detail d-flex align-items-center">
    <calendar-icon size="20" class="mr-3"/>
    <div>
      <div class="small-heading">
        DURATION
      </div>
      <task-duration :task="task"/>
    </div>
  </div>
</template>

<script>
import { CalendarIcon } from 'vue-feather-icons';
import TaskDuration from './TaskDuration.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'TaskDetailsDuration',
  components: {
    TaskDuration,
    CalendarIcon,
  },
  props: {
    task: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style>
  .duration {
    font-weight: bold;
  }
</style>
