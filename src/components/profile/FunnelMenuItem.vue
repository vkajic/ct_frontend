<template>
  <li :class="[stepClass]">
    <router-link :to="step.route" v-if="clickable">
      <check-circle-icon/>
      {{step.label}}
    </router-link>
    <span v-if="!clickable">
      <check-circle-icon/>
      {{step.label}}
    </span>
  </li>
</template>

<script>
import { CheckCircleIcon } from 'vue-feather-icons';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'FunnelMenuItem',
  components: {
    CheckCircleIcon,
  },
  props: {
    step: {
      type: Object,
      required: true,
    },
    currentOrder: {
      type: Number,
      required: true,
    },
  },
  computed: {
    stepClass() {
      const routePath = this.$route.path;

      if (routePath === this.step.route) {
        return 'active';
      }

      if (this.currentOrder > this.step.order) {
        return 'previous';
      }

      return '';
    },
    clickable() {
      return this.currentOrder > this.step.order;
    },
  },
};
</script>

<style scoped>

</style>
