<template>
  <div>
    <b-button variant="info"
              block
              class="btn-round mb-4"
              v-if="buttonVisible"
              @click="reopen">
      {{$t('tasks.details.reopen_button')}}
    </b-button>
  </div>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ReopenTaskButton',
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  computed: {
    /**
     * Make button visible if task status is filled
     * @returns {boolean}
     */
    buttonVisible() {
      return this.task.status === 1;
    },
  },
  methods: {
    reopen() {
      this.$emit('reopen');
    },
  },
};
</script>

<style scoped>

</style>
