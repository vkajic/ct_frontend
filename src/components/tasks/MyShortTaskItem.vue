<template>
  <div class="short-job-item">
    <div class="d-flex align-items-center mb-2">
      <div class="active-since">Published {{task.createdAt | date('MMM Do')}}</div>
    </div>
    <h2>
      <router-link :to="`/my-tasks/${task.id}`">
        {{task.title}}
      </router-link>
    </h2>
    <div class="d-flex align-items-center mb-3">
      <div class="pr-3">{{task.duration}} days</div>
      <div>${{task.price}}</div>
    </div>

    <task-tags :tags="task.skills"/>

    <hr class="mb-4">
  </div>
</template>

<script>
import { dateFilter } from 'vue-date-fns';
import TaskTags from './TaskTags.vue';

// TODO add number of views and applications like in design and edit link if applicable

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'MyShortTaskItem',
  components: {
    TaskTags,
  },
  filters: {
    date: dateFilter,
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
