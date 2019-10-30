<template>
  <div class="task-details">
    <h5 class="mb-4">Project details</h5>

    <b-button variant="primary"
              block
              class="btn-round mb-4"
              v-if="applyAllowed"
              :disabled="alreadyApplied"
              v-b-modal.applicationModal>
      <template v-if="!alreadyApplied">Apply for job</template>
      <template v-if="alreadyApplied">Already applied</template>
    </b-button>

    <b-modal id="applicationModal" title="Apply for task" ok-title="Apply" @ok="apply">
      <b-form>
        <textarea-group v-model="letter" label="Message" :rows="10"/>
      </b-form>
    </b-modal>

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

      <div class="detail d-flex align-items-center">
        <calendar-icon size="20" class="mr-3"/>
        <div>
          <div class="small-heading">
            DURATION
          </div>
          <strong>{{task.duration}} days</strong>
        </div>
      </div>

      <div class="detail d-flex align-items-center">
        <credit-card-icon size="20" class="mr-3"/>
        <div>
          <div class="small-heading">
            VALUE
          </div>
          <strong>${{task.price}}</strong>
        </div>
      </div>
    </div>

    <div class="share" style="display:none;">
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
  CheckSquareIcon, PlusSquareIcon, CalendarIcon, CreditCardIcon, Share2Icon,
} from 'vue-feather-icons';
import TextareaGroup from '../form/TextareaGroup.vue';

// TODO change how status is displayed

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'TaskDetails',
  components: {
    TextareaGroup,
    CheckSquareIcon,
    PlusSquareIcon,
    CalendarIcon,
    CreditCardIcon,
    Share2Icon,
  },
  filters: {
    date: dateFilter,
  },
  data() {
    return {
      applied: false,
      letter: null,
    };
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
    applicable: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    /**
     * Checks if user can apply on task
     * @return {boolean}
     */
    applyAllowed() {
      return this.$store.state.user.activeRole === 'freelancer' && this.applicable;
    },

    /**
     * Check if user freelancer already applied for task
     * @return {boolean}
     */
    alreadyApplied() {
      return this.applied
        || (!!this.task.applications && !!this.task.applications.length);
    },

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
  methods: {
    async apply() {
      try {
        await this.$store.dispatch('tasks/applyForTask', {
          taskId: this.task.id,
          letter: this.letter,
        });
        this.$store.dispatch('ui/showNotification', {
          type: 'success',
          text: 'You applied for this task',
        });
        this.applied = true;
        this.letter = null;
      } catch (err) {
        this.$store.dispatch('ui/showNotification', {
          type: 'danger',
          text: err.response.data.message,
        });
      }
    },
  },
};
</script>
