<template>
  <div class="task-title">
    <div class="d-flex align-items-center">
      <div class="d-flex align-items-center mb-3">
        <h1 class="mb-0">
          {{ task.title }}
        </h1>
        <bc-check-status checkType="task" :task="task" class="ml-2"/>
      </div>
      <slot name="title"/>
    </div>
    <small-employer :employer="clientData" class="mb-5" v-if="clientData"/>
  </div>
</template>

<script>
import SmallEmployer from './SmallEmployer.vue';
import BcCheckStatus from '../common/BcCheckStatus.vue';

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
    client: {
      type: Object,
      default: null,
    },
  },
  computed: {
    clientData() {
      return this.client ? this.client : this.task.client;
    },
  },
};
</script>
