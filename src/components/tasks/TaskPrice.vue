<template>
  <div>
    <div class="price" v-if="!task.negotiablePrice">${{task.price}}</div>
    <div class="price" v-else>{{$t('tasks.details.negotiable')}}</div>
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
