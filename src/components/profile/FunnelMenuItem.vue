<template>
  <li :class="[stepClass]">
    <language-router-link :to="step.route" v-if="clickable">
      <check-circle-icon/>
      {{step.label}}
    </language-router-link>
    <span v-if="!clickable">
      <check-circle-icon/>
      {{step.label}}
    </span>
  </li>
</template>

<script>
import { CheckCircleIcon } from 'vue-feather-icons';
import LanguageRouterLink from '../ui/LanguageRouterLink.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'FunnelMenuItem',
  components: {
    LanguageRouterLink,
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
