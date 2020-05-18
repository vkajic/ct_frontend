<template>
  <ul class="list-unstyled funnel-menu">
    <funnel-menu-item v-for="d in steps" :key="d.order" :step="d" :current-order="currentOrder"/>
  </ul>
</template>

<script>
import FunnelMenuItem from './FunnelMenuItem.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'FunnelMenu',
  components: { FunnelMenuItem },
  props: {
    items: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      steps: [
        {
          route: '/create-freelancer/basic-info',
          order: 1,
          label: 'Basic info',
        },
        {
          route: '/create-freelancer/skills',
          order: 2,
          label: 'Skills & services',
        },
        {
          route: '/create-freelancer/work-experience',
          order: 3,
          label: 'Work experience',
        },
        {
          route: '/create-freelancer/projects',
          order: 4,
          label: 'Add projects',
        },
        {
          route: '/create-freelancer/preview',
          order: 5,
          label: 'Publish profile',
        },
      ],
    };
  },
  computed: {
    currentOrder() {
      const routePath = this.$route.path;
      const currentStep = this.steps.find(s => s.route === routePath);
      return currentStep.order;
    },
  },
};
</script>
