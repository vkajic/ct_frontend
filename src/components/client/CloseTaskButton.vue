<template>
  <div>
    <b-button
      block
      class="btn-info--grey btn-round btn-secondary mb-4"
      v-if="buttonVisible"
      @click="close">
      Close job
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
    buttonVisible() {
      return this.task.status === 2;
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
