<template>
  <div>
    <div class="duration" v-if="!task.negotiableDuration">
      {{task.duration}} {{$t('tasks.details.days')}}
    </div>
    <div class="duration" v-else>{{$t('tasks.details.negotiable')}}</div>
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
