<template>
  <div>
    <div class="d-flex align-items-center justify-content-between">
      <h3>
        <router-link :to="`/tasks/${task.id}`">{{task.title}}</router-link>
      </h3>
      <div class="text-muted">{{createdDate}}</div>
    </div>
    <p>{{partialDescription}}</p>

    <hr class="my-4"/>
  </div>
</template>

<script>
import moment from 'moment';
import { truncate } from 'lodash';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ClientTasksListItem',
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  computed: {
    createdDate() {
      return moment(this.task.createdAt)
        .fromNow();
    },
    partialDescription() {
      const stripped = this.task.description.replace(/(<([^>]+)>)/ig, '');
      return truncate(stripped, {
        length: 300,
        separator: ' ',
      });
    },
  },
};
</script>
