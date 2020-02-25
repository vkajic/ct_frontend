<template>
  <div v-html="description"></div>
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
