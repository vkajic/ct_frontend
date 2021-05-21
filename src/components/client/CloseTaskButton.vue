<template>
  <div>
    <b-button
      block
      class="btn-info--grey btn-round btn-secondary mb-4"
      v-if="buttonVisible"
      @click="close">
      {{$t('tasks.details.close_button')}}
    </b-button>
  </div>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'CloseTaskButton',
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  computed: {
    /**
     * Set button visibility depending on task status
     * If task is created or opened make button visible
     * @returns {boolean}
     */
    buttonVisible() {
      return [0, 2].indexOf(this.task.status) > -1;
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>

</style>
