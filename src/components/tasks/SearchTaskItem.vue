<template>
  <div class="short-task-item">
    <div class="d-flex align-items-center justify-content-between mb-2">
      <language-router-link :to="`clients/${taskData.postedById}`" class="client-name font-14-sm">
        {{taskData.postedBy}}
      </language-router-link>
      <div class="published-date">{{taskData.timePosted | date('MMM Do')}}</div>
    </div>
    <h4>
      <language-router-link class="font-18-sm" :to="`/tasks/${task._id}`">
        {{taskData.title}}
      </language-router-link>
    </h4>
    <div class="d-flex align-items-center mb-3">
      <task-duration class="pr-3" :task="taskData"/>
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
import LanguageRouterLink from '../ui/LanguageRouterLink.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'SearchTaskItem',
  components: {
    LanguageRouterLink,
    TaskDuration,
    TaskPrice,
    TaskTags,
  },
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
