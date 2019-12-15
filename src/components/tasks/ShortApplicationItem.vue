<template>
  <div class="short-task-item">
    <div class="d-flex align-items-center justify-content-between mb-2">
      <div class="client-name">{{application.client.name}}</div>
      <div class="published-date">
        Published {{application.task.createdAt | date('MMM Do')}} |
        Applied {{application.createdAt | date('MMM Do')}}
      </div>
    </div>
    <h4>
      <router-link class="font-18-sm" :to="url">
        {{application.task.title}}
      </router-link>
    </h4>
    <div class="d-flex align-items-center mb-3">
      <div class="duration pr-3">{{application.task.duration}} days</div>
      <div class="price">${{application.task.price}}</div>
    </div>

    <task-tags :tags="application.task.skills"/>

    <hr class="mb-4">
  </div>
</template>

<script>
import { dateFilter } from 'vue-date-fns';
import TaskTags from './TaskTags.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ShortApplicationItem',
  components: { TaskTags },
  filters: {
    date: dateFilter,
  },
  props: {
    application: {
      type: Object,
      required: true,
    },
  },
  computed: {
    url() {
      return this.application.status === 0
        ? `/applications/${this.application.id}`
        : `/in-progress/${this.application.id}`;
    },
  },
};
</script>
