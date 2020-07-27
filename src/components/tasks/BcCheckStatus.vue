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
    checkType: {
      type: String,
      default() {
        return 'task';
      },
    },
    task: {
      type: Object,
      default() {
        return {};
      },
    },
    freelancer: {
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
    freelancer() {
      this.checkBc();
    },
    isBcDataSet() {
      this.checkBc();
    },
  },
  methods: {
    async checkBc() {
      const bcData = this.$smartContract.getBcData();

      if (this.checkType === 'task') {
        if (this.task.bcId !== null && this.task.bcId !== undefined && this.isBcDataSet && bcData) {
          const bcTask = await bcData.contract.methods.getTask(this.task.bcId);
          console.log(bcTask);
          this.isOnBc = bcTask.decodedResult.infoHash === this.$smartContract.createTaskInfoHash(this.task);
        }
      } else if (this.checkType === 'client') {

      } else if (this.checkType === 'freelancer') {
        if (this.freelancer.bcId !== null && this.freelancer.bcId !== undefined && this.isBcDataSet && bcData) {
          const bcProfile = await bcData.contract.methods.getProfile(this.freelancer.bcId);
          console.log(bcProfile);
          this.isOnBc = bcProfile.decodedResult.flancerInfoHash === this.$smartContract.createFlancerInfoHash(this.freelancer);
        }
      } else if (this.checkType === 'feedback') {

      } else {
        console.log('BC check type not found!');
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
