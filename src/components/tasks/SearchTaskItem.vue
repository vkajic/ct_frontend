<template>
  <div class="short-task-item">
    <div class="d-flex align-items-center justify-content-between mb-2">
      <div class="client-name font-14-sm">{{taskData.postedBy}}</div>
      <div class="published-date">{{taskData.timePosted | date('MMM Do')}}</div>
    </div>
    <h4>
      <router-link class="font-18-sm" :to="`/tasks/${task._id}`">
        {{taskData.title}}
      </router-link>
    </h4>
    <div class="d-flex align-items-center mb-3">
      <task-duration :task="taskData"/>
      <task-price :task="taskData"/>
    </div>

    <task-tags :tags="skills"/>

    <hr class="mb-4">
  </div>
</template>

<script>
import { dateFilter } from 'vue-date-fns';
import TaskTags from './TaskTags.vue';
import TaskPrice from './TaskPrice.vue';
import TaskDuration from './TaskDuration.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'SearchTaskItem',
  components: { TaskDuration, TaskPrice, TaskTags },
  filters: {
    date: dateFilter,
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  computed: {
    taskData() {
      return this.task._source;
    },
    skills() {
      return this.taskData.skills.map(s => ({ name: s }));
    },
  },
};
</script>
