<template>
  <div class="short-task-item">
    <div class="d-flex align-items-start">
      <avatar-display :avatar="avatar" :options="avatarOptions" class="mr-4" />
      <div class="flex-grow-1">
        <div class="d-flex align-items-center justify-content-between mb-2">
          <language-router-link :to="`clients/${taskData.postedBySlug}/${taskData.postedById}`"
                                class="client-name font-14-sm">
            {{ taskData.postedBy }}
          </language-router-link>
          <div class="published-date">{{ taskData.timePosted | date('MMM Do') }}</div>
        </div>
        <h4>
          <language-router-link class="font-18-sm" :to="`/tasks/${taskData.slug}/${task._id}`">
            {{ taskData.title }}
          </language-router-link>
        </h4>
        <div class="d-flex align-items-center mb-3">
          <task-duration class="mr-3" :task="taskData"/>
          <task-price class="mr-3" :task="taskData"/>
          <applications-counter :count="taskData.applications"/>
        </div>
      </div>
    </div>

    <task-tags :tags="skills"/>

    <hr class="mb-4">
  </div>
</template>

<script>
import { dateFilter } from 'vue-date-fns';
import ApplicationsCounter from '@/components/tasks/ApplicationsCounter.vue';
import AvatarDisplay from '@/components/ui/AvatarDisplay.vue';
import TaskTags from './TaskTags.vue';
import TaskPrice from './TaskPrice.vue';
import TaskDuration from './TaskDuration.vue';
import LanguageRouterLink from '../ui/LanguageRouterLink.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'SearchTaskItem',
  components: {
    AvatarDisplay,
    ApplicationsCounter,
    LanguageRouterLink,
    TaskDuration,
    TaskPrice,
    TaskTags,
  },
  data() {
    return {
      avatarOptions: {
        resize: {
          width: 100,
          height: 100,
        },
      },
    };
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
    avatar() {
      return {
        fileName: this.taskData.postedByAvatar,
      };
    },
  },
};
</script>
