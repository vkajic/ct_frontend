<template>
  <div>
    <div class="price">
      ${{ task.price }}
      <span v-if="task.negotiablePrice">({{ $t('tasks.details.negotiable') }})</span>
    </div>
  </div>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'TaskPrice',
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
