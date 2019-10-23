<template>
  <div class="lazy-loader d-flex align-items-center justify-content-center w-100" v-if="visible">
    <loader-ring/>
  </div>
</template>

<script>
import LoaderRing from './LoaderRing.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'LazyLoader',
  components: { LoaderRing },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
