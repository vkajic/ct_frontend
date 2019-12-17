<template>
  <div>
    <check-circle-icon size="1x" v-if="isOnBc"/>
    <x-circle-icon size="1x" v-else/>
  </div>
</template>

<script>
import { CheckCircleIcon, XCircleIcon } from 'vue-feather-icons';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'BcCheckStatus',
  components: {
    CheckCircleIcon,
    XCircleIcon,
  },
  props: {
    task: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      isOnBc: false,
    };
  },
  created() {
    this.checkBc();
  },
  watch: {
    task() {
      this.checkBc();
    },
  },
  methods: {
    async checkBc() {
      if (this.task.bcId) {
        const bcData = this.$smartContract.getBcData();
        const bcTask = await bcData.contract.methods.getTask(this.task.bcId);
        this.isOnBc = bcTask.decodedResult.title === this.task.title
          && bcTask.decodedResult.taskValue === this.task.price
          && bcTask.decodedResult.workTime === this.task.duration;
      }
    },
  },
};
</script>
