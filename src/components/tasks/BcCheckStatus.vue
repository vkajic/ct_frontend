<template>
  <div class="on-bc" v-if="isOnBc">
    <a
      href="https://explorer.aeternity.io/contracts/transactions/ct_DeRuk3os1AaoiNtpiHnX5GnUHCVhqgZP9uQnEdx1UzNMq65Pf" target="_blank" rel="noopener noreferrer">
      <img src="@/assets/img/aeternity.png" alt="Aeternity"/>
    </a>
  </div>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'BcCheckStatus',
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
    isBcDataSet() {
      this.checkBc();
    },
  },
  methods: {
    async checkBc() {
      const bcData = this.$smartContract.getBcData();
      if (this.task.bcId !== null && this.task.bcId !== undefined && this.isBcDataSet && bcData) {
        const bcTask = await bcData.contract.methods.getTask(this.task.bcId);
        console.log(bcTask);
        this.isOnBc = bcTask.decodedResult.title === this.task.title
          && bcTask.decodedResult.taskValue === parseInt(this.task.price, 10)
          && bcTask.decodedResult.workTime === this.task.duration;
      }
    },
  },
  computed: {
    isBcDataSet() {
      return this.$store.state.user.bcDataSet;
    },
  },
};
</script>
