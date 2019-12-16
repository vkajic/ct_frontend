<template>
  <div class="short-task-item">
    <div class="d-flex align-items-center justify-content-between mb-2">
      <div class="client-name font-14-sm">{{task._source.postedBy}}</div>
      <div class="published-date">{{task._source.timePosted | date('MMM Do')}}</div>
    </div>
    <h4>
      <router-link class="font-18-sm" :to="`/tasks/${task._id}`">
        {{task._source.title}}
      </router-link>
    </h4>
    <div class="d-flex align-items-center mb-3">
      <div class="duration pr-3">{{task._source.duration}} days</div>
      <div class="price">${{task._source.price}}</div>
    </div>

    <task-tags :tags="skills"/>

    <hr class="mb-4">
  </div>
</template>

<script>
import { dateFilter } from 'vue-date-fns';
import TaskTags from './TaskTags.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'SearchTaskItem',
  components: { TaskTags },
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
    skills() {
      return this.task._source.skills.map(s => ({ name: s }));
    },
  },
};
</script>
