<template>
  <div>
    <search-task-item v-for="task in tasks" :key="task.id" :task="task"/>
    <search-load-more-button/>
  </div>
</template>

<script>
import SearchTaskItem from './SearchTaskItem.vue';
import SearchLoadMoreButton from './SearchLoadMoreButton.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'SearchTasksList',
  components: {
    SearchLoadMoreButton,
    SearchTaskItem,
  },
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
