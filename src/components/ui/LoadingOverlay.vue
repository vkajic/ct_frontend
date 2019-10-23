<template>
  <div class="loading-overlay d-flex align-items-center justify-content-center" v-if="visible">
    <loader-ring/>
  </div>
</template>

<script>
import LoaderRing from './LoaderRing.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'LoadingOverlay',
  components: { LoaderRing },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
