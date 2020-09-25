<template>
  <div class="on-bc" v-if="isOnBc">
    <a v-b-modal.blockchain-modal>
      <img v-if="!isDarkMode" src="@/assets/img/bc_icon.png" alt="Blockchain"/>
      <img v-if="isDarkMode" src="@/assets/img/bc_icon_dark.png" alt="Blockchain"/>
    </a>

    <b-modal id="blockchain-modal" :centered="true" :hide-footer="true"
             :title="$t('tasks.blockchain_title')">
      <p class="my-4">
        {{ $t('tasks.blockchain_label') }},
        <a
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
    isDarkMode() {
      return this.$store.state.ui.isDarkThemeEnabled;
    },
  },
};
</script>
