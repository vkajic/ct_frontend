<template>
  <div class="short-job-item">
    <div class="d-flex align-items-center mb-2">
      <div class="active-since" v-if="task.published">
        {{ $t('tasks.published') }} {{ task.createdAt | date('MMM Do') }}
      </div>
      <b-badge variant="danger" v-if="!task.published">
        {{ $t('tasks.unpublished') }}
      </b-badge>
    </div>
    <h2>
      <language-router-link class="font-18-sm" :to="`/my-tasks/${task.id}`">{{ task.title }}
      </language-router-link>
    </h2>
    <div class="d-flex align-items-center mb-3">
      <task-duration class="pr-3" :task="task"/>
      <task-price :task="task"/>
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

// TODO add number of views and applications like in design and edit link if applicable

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'MyShortTaskItem',
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
      default() {
        return {};
      },
    },
  },
  computed: {
    currentLanguage() {
      return this.$store.getters['util/getCurrentLanguage'];
    },

    skills() {
      return this.task.skills
        ? this.task.skills.map(s => ({
          name: s.translations
            .find(t => t.languageId === this.currentLanguage.id).displayTranslation,
        }))
        : [];
    },
  },
};
</script>
