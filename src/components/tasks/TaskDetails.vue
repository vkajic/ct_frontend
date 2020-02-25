<template>
  <div class="task-details">
    <h5 class="d-none d-lg-block mb-4">Project details</h5>
    <slot name="buttons"/>
    <div>
      <div class="detail d-flex align-items-center">
        <check-square-icon size="20" class="mr-3"/>
        <div>
          <div class="small-heading">
            POSTED
          </div>
          <strong>Posted on {{task.createdAt | date('MMM Do, YYYY')}}</strong>
        </div>
      </div>

      <div class="detail d-flex align-items-center">
        <plus-square-icon size="20" class="mr-3"/>
        <div>
          <div class="small-heading">
            STATUS
          </div>
          <strong>Accepting applications</strong>
        </div>
      </div>

      <task-details-duration :task="task"/>
      <task-details-value :task="task"/>

      <div v-if="task.location" class="detail d-flex align-items-center">
        <map-pin-icon size="20" class="mr-3"/>
        <div>
          <div class="small-heading">
            LOCATION
          </div>
          <strong>{{task.location === 'onsite' ? 'On Site' : 'Remote'}}</strong>
        </div>
      </div>

      <div v-if="task.type" class="detail d-flex align-items-center">
        <tag-icon size="20" class="mr-3"/>
        <div>
          <div class="small-heading">
            TYPE
          </div>
          <strong>{{task.type === 'parttime' ? 'Part Time' : 'Full Time'}}</strong>
        </div>
      </div>
    </div>

    <div class="share d-none">
      <a href="#" class="d-flex align-items-center text-secondary">
        <share-2-icon size="20" class="mr-3"/>
        Share
      </a>
    </div>

    <b-link :to="`/my-tasks/${task.id}/edit`"
            class="btn btn-primary btn-block btn-round mt-4"
            v-if="editAllowed">
      Edit
    </b-link>
  </div>
</template>

<script>
import { get } from 'lodash';
import { dateFilter } from 'vue-date-fns';
import {
  CheckSquareIcon,
  PlusSquareIcon,
  Share2Icon,
  MapPinIcon,
  TagIcon,
} from 'vue-feather-icons';
import TaskDetailsValue from './TaskDetailsValue.vue';
import TaskDetailsDuration from './TaskDetailsDuration.vue';

// TODO change how status is displayed

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'TaskDetails',
  components: {
    TaskDetailsDuration,
    TaskDetailsValue,
    CheckSquareIcon,
    PlusSquareIcon,
    Share2Icon,
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
  computed: {
    /**
     * Is edit allowed on task
     * Edit is allowed only if status is CREATED or HIRED and current user has created that task
     * @return {boolean}
     */
    editAllowed() {
      const client = get(this, '$store.state.user.user.client');
      return this.task.status === 0 && client && client.id === this.task.postedBy;
    },
  },
};
</script>
