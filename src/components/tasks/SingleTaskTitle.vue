<template>
  <div class="task-title">
    <div class="d-flex align-items-center">
      <h1 class="d-flex align-items-center">
        {{task.title}}
        <bc-check-status checkType="task" :task="task" class="ml-2"/>
      </h1>
      <slot name="title"/>
    </div>
    <small-employer :employer="clientData" class="mb-5" v-if="clientData"/>
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
