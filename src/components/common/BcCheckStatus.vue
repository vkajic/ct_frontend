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
    client: {
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
    client() {
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
          const bcTask = await bcData.contractStore.methods.getTask(this.task.bcId);
          console.log(bcTask);
          this.isOnBc = bcTask.decodedResult.infoHash === this.$smartContract.createTaskInfoHash(this.task);
        }
      } else if (this.checkType === 'client') {
        console.log(this.client);
        if (this.client.bcId !== null && this.client.bcId !== undefined && this.isBcDataSet && bcData) {
          const bcProfile = await bcData.contractStore.methods.getProfile(this.client.bcId);
          console.log(bcProfile);
          console.log(bcProfile.decodedResult.clientInfoHash);
          console.log(this.$smartContract.createClientInfoHash(this.client));
          this.isOnBc = bcProfile.decodedResult.clientInfoHash === this.$smartContract.createClientInfoHash(this.client);
        }
      } else if (this.checkType === 'freelancer') {
        console.log(this.freelancer);
        if (this.freelancer.bcId !== null && this.freelancer.bcId !== undefined && this.isBcDataSet && bcData) {
          const bcProfile = await bcData.contractStore.methods.getProfile(this.freelancer.bcId);
          console.log(bcProfile);
          console.log(bcProfile.decodedResult.flancerInfoHash);
          console.log(this.$smartContract.createFlancerInfoHash(this.freelancer));
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
