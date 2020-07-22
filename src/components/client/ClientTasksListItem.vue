<template>
  <div>
    <div class="d-flex align-items-center justify-content-between">
      <h3>
        <language-router-link :to="`/tasks/${task.id}`">{{task.title}}</language-router-link>
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
import LanguageRouterLink from '../ui/LanguageRouterLink.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ClientTasksListItem',
  components: { LanguageRouterLink },
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
