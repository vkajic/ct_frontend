<template>
  <div>
    <div class="price" v-if="!task.negotiablePrice">${{task.price}}</div>
    <div class="price" v-else>Negotiable</div>
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
