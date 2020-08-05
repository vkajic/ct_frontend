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
          route: 'basic-info',
          order: 1,
          label: 'freelancers.basic_info',
        },
        {
          route: 'skills',
          order: 2,
          label: 'freelancers.skills_services',
        },
        {
          route: 'work-experience',
          order: 3,
          label: 'freelancers.work_experience',
        },
        {
          route: 'projects',
          order: 4,
          label: 'freelancers.add_projects',
        },
        {
          route: 'preview',
          order: 5,
          label: 'freelancers.publish_button',
        },
      ],
    };
  },
  computed: {
    currentOrder() {
      const routePath = this.$route.name;
      const currentStep = this.steps.find(s => s.route === routePath);
      return currentStep.order;
    },
  },
};
</script>
