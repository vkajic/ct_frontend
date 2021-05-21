<template>
  <div class="task-details">
    <h5 class="d-none d-lg-block mb-4">{{$t('tasks.details.title')}}</h5>
    <slot name="buttons"/>
    <div>
      <div class="detail d-flex align-items-center">
        <check-square-icon size="20" class="mr-3"/>
        <div>
          <div class="small-heading">
            {{$t('tasks.details.posted_label')}}
          </div>
          <strong>
            {{$t('tasks.details.posted_on')}} {{task.createdAt | date('MMM Do, YYYY')}}
          </strong>
        </div>
      </div>

      <task-details-status :task="task"/>
      <task-details-duration :task="task"/>
      <task-details-value :task="task"/>

      <div v-if="task.location" class="detail d-flex align-items-center">
        <map-pin-icon size="20" class="mr-3"/>
        <div>
          <div class="small-heading">
            {{$t('tasks.details.location')}}
          </div>
          <strong>{{$t('tasks.details.' + task.location)}}</strong>
        </div>
      </div>

      <div v-if="task.type" class="detail d-flex align-items-center">
        <tag-icon size="20" class="mr-3"/>
        <div>
          <div class="small-heading">
            {{$t('tasks.details.type')}}
          </div>
          <strong>{{$t('tasks.details.' + task.type)}}</strong>
        </div>
      </div>
    </div>

    <!-- <div class="share d-none">
      <a href="#" class="d-flex align-items-center text-secondary">
        <share-2-icon size="20" class="mr-3"/>
        Share
      </a>
    </div> -->

    <task-details-buttons :task="task"/>
  </div>
</template>

<script>
import { dateFilter } from 'vue-date-fns';
import {
  CheckSquareIcon,
  MapPinIcon,
  TagIcon,
} from 'vue-feather-icons';
import TaskDetailsValue from './TaskDetailsValue.vue';
import TaskDetailsDuration from './TaskDetailsDuration.vue';
import TaskDetailsStatus from './TaskDetailsStatus.vue';
import TaskDetailsButtons from './TaskDetailsButtons.vue';

// TODO change how status is displayed

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'TaskDetails',
  components: {
    TaskDetailsButtons,
    TaskDetailsStatus,
    TaskDetailsDuration,
    TaskDetailsValue,
    CheckSquareIcon,
    MapPinIcon,
    TagIcon,
  },
  filters: {
    date: dateFilter,
  },
  data() {
    return {
      applied: false,
    };
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
};
</script>
