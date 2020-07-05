<template>
  <div class="short-task-item">
    <div class="d-flex align-items-center justify-content-between mb-2">
      <div class="client-name">{{application.client.name}}</div>
      <div class="published-date">
        {{$t('freelancers.published')}} {{application.task.createdAt | date('MMM Do')}} |
        {{$t('freelancers.applied')}} {{application.createdAt | date('MMM Do')}}
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
      <task-duration class="pr-3" :task="application.task"/>
      <task-price :task="application.task"/>
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
import TaskPrice from './TaskPrice.vue';
import TaskDuration from './TaskDuration.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ShortApplicationItem',
  components: { TaskDuration, TaskPrice, ApplicationStatusBadge, TaskTags },
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
