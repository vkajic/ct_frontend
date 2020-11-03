<template>
  <div>
    <div class="d-flex align-items-center justify-content-between">
      <h3>
        <language-router-link :to="`/tasks/${task.id}`">{{ task.title }}</language-router-link>
      </h3>
      <div class="text-muted">{{ createdDate }}</div>
    </div>
    <p v-html="partialDescription"></p>

    <hr class="my-4"/>
  </div>
</template>

<script>
import moment from 'moment';
import htmlToText from 'html-to-text';
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
      const stripped = htmlToText.fromString(this.task.description, {
        wordwrap: 300,
      });

      return truncate(stripped, {
        length: 300,
        separator: ' ',
      });
    },
  },
};
</script>
