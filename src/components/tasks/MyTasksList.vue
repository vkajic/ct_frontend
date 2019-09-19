<template>
  <div>
    <my-short-task-item v-for="(task, index) in tasks" :key="index" :task="task"/>
  </div>
</template>

<script>
import MyShortTaskItem from './MyShortTaskItem.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'MyTasksList',
  components: { MyShortTaskItem },
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
