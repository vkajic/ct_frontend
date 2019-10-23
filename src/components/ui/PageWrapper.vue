<template>
  <div class="row">
    <div class="pt-5" :class="menuClass">
      <left-menu v-if="showMenu"/>
    </div>
    <div :class="containerClass">
      <slot/>
      <loading-overlay :visible="loading"/>
    </div>
  </div>
</template>

<script>
import LeftMenu from '../layout/LeftMenu.vue';
import LoadingOverlay from './LoadingOverlay.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'PageWrapper',
  components: {
    LoadingOverlay,
    LeftMenu,
  },
  props: {
    manualLoading: {
      type: Boolean,
      default: false,
    },
    menuWidth: {
      type: Number,
      default: 3,
    },
    showMenu: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    menuClass() {
      return `col-${this.menuWidth}`;
    },
    containerClass() {
      return `col-${12 - (this.menuWidth * 2)}`;
    },
    loading() {
      return this.$store.state.ui.mainLoader || this.manualLoading;
    },
  },
};
</script>
