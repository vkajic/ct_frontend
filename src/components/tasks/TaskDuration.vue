<template>
  <div>
    <div class="duration" v-if="!task.negotiableDuration">{{task.duration}} days</div>
    <div class="duration" v-else>Negotiable</div>
  </div>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'TaskDuration',
  props: {
    task: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>

</style>
