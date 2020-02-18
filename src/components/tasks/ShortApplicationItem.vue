<template>
  <div class="short-task-item">
    <div class="d-flex align-items-center justify-content-between mb-2">
      <div class="client-name">{{application.client.name}}</div>
      <div class="published-date">
        Published {{application.task.createdAt | date('MMM Do')}} |
        Applied {{application.createdAt | date('MMM Do')}}
      </div>
    </div>
    <div class="d-flex align-items-center mb-2">
      <h4 class="m-0 mr-2">
        <router-link class="font-18-sm" :to="url">
          {{application.task.title}}
        </router-link>
      </h4>
      <application-status-badge :application="application"/>
    </div>
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
import { applicationUrl } from '../mixins/applicationUrl';
import ApplicationStatusBadge from './ApplicationStatusBadge.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ShortApplicationItem',
  components: { ApplicationStatusBadge, TaskTags },
  mixins: [applicationUrl],
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
      return this.generateApplicationUrl(this.application);
    },
  },
};
</script>
