<template>
  <span>{{calculated}}</span>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'RemainingDays',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    calculated() {
      const now = new Date().getTime();
      const num = Math.round(this.item.worktime - (now / 1000 - this.item.applyTime) / 3600 / 24);

      if (num < 1) {
        return '0 days';
      }

      return `${num} days`;
    },
  },
};
</script>
