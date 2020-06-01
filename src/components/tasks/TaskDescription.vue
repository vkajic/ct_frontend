<template>
  <div class="text-break" v-html="description"></div>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'TaskDescription',
  props: {
    description: {
      type: String,
      default: '',
    },
  },
};
</script>
