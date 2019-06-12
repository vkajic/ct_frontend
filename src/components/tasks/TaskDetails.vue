<template>
  <div class="desc-container">
    <div class="row">
      <div class="col-md-8">
        <label>Task description</label>
        <div class="desc">
          {{item.description}}
        </div>
        <task-apply-for-job :task="item"/>
        <task-application-link :task="item" :application="application"/>
      </div>
      <div class="col-md-4 seccol">
        <!-- div class="secondary">
          <label>Posted</label>
          {{calculateDays(item.timestamp)}}
        </div -->
        <div class="secondary">
          <label>Worktime</label>
          {{item.worktime}} day(s)
        </div>
        <div class="secondary">
          <label>Status</label>
          <span :class="item">{{status}}</span>
        </div>
        <div class="secondary">
          <label>Worktime left</label>
          <div class="deadline">
            <remaining-days :item="item"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RemainingDays from './RemainingDays.vue';
import TaskApplyForJob from './TaskApplyForJob.vue';
import tasksService from '../../services/tasks.service';
import TaskApplicationLink from './TaskApplicationLink.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'TaskDetails',
  components: {
    TaskApplicationLink,
    TaskApplyForJob,
    RemainingDays,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    applications: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    status() {
      if (this.item) {
        return tasksService.getTaskStatus(this.item.stage);
      }

      return null;
    },

    /**
     * Get current users application for this task if exists
     */
    application() {
      const freelancerId = this.$store.getters['user/getCurrentUserId'];

      if (this.applications.length) {
        const application = this.applications.find(a => a.freelancerId === freelancerId);

        return application || {};
      }

      return {};
    },
  },
};
</script>
