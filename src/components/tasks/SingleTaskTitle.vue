<template>
  <div class="task-title">
    <h1 class="d-flex align-items-center">
      {{task.title}}
      <bc-check-status :task="task" class="ml-2"/>
    </h1>
    <small-employer :employer="task.client" class="mb-5" v-if="task.client"/>
  </div>
</template>

<script>
import SmallEmployer from './SmallEmployer.vue';
import BcCheckStatus from './BcCheckStatus.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'SingleTaskTitle',
  components: {
    BcCheckStatus,
    SmallEmployer,
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
};
</script>
