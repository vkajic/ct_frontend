<template>
  <div class="row">
    <div class="d-none d-lg-block col-lg-2 pt-5">
      <funnel-menu/>
    </div>
    <div class="col-12 col-lg-8">
      <paper>
        <slot/>
      </paper>
    </div>
  </div>
</template>

<script>
import FunnelMenu from './FunnelMenu.vue';
import Paper from '../ui/Paper.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'FunnelContainer',
  components: {
    Paper,
    FunnelMenu,
  },
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
