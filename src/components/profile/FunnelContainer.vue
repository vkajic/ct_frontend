<template>
  <div class="row">
    <div class="col-2 pt-5">
      <funnel-menu/>
    </div>
    <div class="col-8">
      <div class="paper px-7 py-6">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
import FunnelMenu from './FunnelMenu.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'FunnelContainer',
  components: { FunnelMenu },
  props: {
    menuItems: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
