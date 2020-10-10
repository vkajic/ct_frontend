<template>
  <div class="on-bc" v-if="isOnBc">
    <a @click.prevent="$bvModal.show(modalId)">
      <img v-if="!isDarkMode" src="@/assets/img/bc_icon.png" alt="Blockchain"/>
      <img v-if="isDarkMode" src="@/assets/img/bc_icon_dark.png" alt="Blockchain"/>
    </a>

    <b-modal :id="modalId" :centered="true" :hide-footer="true"
             :title="$t('tasks.blockchain_title')">
      <p class="my-4">
        {{ $t('tasks.blockchain_label') }},
        <a target="_blank"
          href="https://explorer.aeternity.io/contracts/transactions/ct_DeRuk3os1AaoiNtpiHnX5GnUHCVhqgZP9uQnEdx1UzNMq65Pf">
          {{ $t('tasks.more_details') }}
        </a>
      </p>
    </b-modal>
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
    feedback: {
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
    feedback() {
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
          const hash = this.$smartContract.createTaskInfoHash(this.task);
          console.log(bcTask);
          console.log(bcTask.decodedResult.infoHash);
          console.log(hash);
          this.isOnBc = bcTask.decodedResult.infoHash === hash;
        }
      } else if (this.checkType === 'client') {
        if (this.client.bcId !== null
          && this.client.bcId !== undefined && this.isBcDataSet && bcData) {
          const bcProfile = await bcData.contractStore.methods.getProfile(this.client.bcId);
          const hash = this.$smartContract.createClientInfoHash(this.client);
          console.log(bcProfile);
          console.log(bcProfile.decodedResult.clientInfoHash);
          console.log(hash);
          this.isOnBc = bcProfile.decodedResult.clientInfoHash === hash;
        }
      } else if (this.checkType === 'freelancer') {
        if (this.freelancer.bcId !== null
          && this.freelancer.bcId !== undefined && this.isBcDataSet && bcData) {
          const bcProfile = await bcData.contractStore.methods.getProfile(this.freelancer.bcId);
          const hash = this.$smartContract.createFlancerInfoHash(this.freelancer);
          console.log(bcProfile);
          console.log(bcProfile.decodedResult.flancerInfoHash);
          console.log(hash);
          this.isOnBc = bcProfile.decodedResult.flancerInfoHash === hash;
        }
      } else if (this.checkType === 'freelancerFeedbacks') {
        if (this.feedback.bcId !== null
          && this.feedback.bcId !== undefined && this.isBcDataSet && bcData) {
          const bcFeedback = await bcData.contractStore.methods.getFeedback(this.feedback.bcId);
          console.log(bcFeedback);
          console.log(bcFeedback.decodedResult.flancersScore);
          this.isOnBc = bcFeedback.decodedResult.flancersScore === this.feedback.clientRate;
        }
      } else if (this.checkType === 'clientFeedbacks') {
        if (this.feedback.bcId !== null
          && this.feedback.bcId !== undefined && this.isBcDataSet && bcData) {
          const bcFeedback = await bcData.contractStore.methods.getFeedback(this.feedback.bcId);
          console.log(bcFeedback);
          console.log(bcFeedback.decodedResult.clientsScore);
          this.isOnBc = bcFeedback.decodedResult.clientsScore === this.feedback.freelancerRate;
        }
      } else {
        console.log('BC check type not found!');
      }
    },
  },
  computed: {
    isBcDataSet() {
      return this.$store.state.user.bcDataSet;
    },

    isDarkMode() {
      return this.$store.state.ui.isDarkThemeEnabled;
    },

    modalId() {
      return `blockchain-modal${Math.random()
        .toString(36)
        .substring(2, 15)}${Math.random()
        .toString(36)
        .substring(2, 15)}`;
    },
  },
};
</script>
