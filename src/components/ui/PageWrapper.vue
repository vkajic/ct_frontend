<template>
  <div class="row">
    <div class="d-none d-lg-block pt-5" :class="menuClass">
      <left-menu v-if="showMenu"/>
    </div>
    <div class="col-12" :class="containerClass">
      <slot/>
      <loading-overlay :visible="loading"/>
    </div>
    <div class="d-none d-lg-block" :class="sidebarClass">
      <slot name="sidebar"/>
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
    sidebarWidth: {
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
      return `col-lg-${this.menuWidth}`;
    },
    containerClass() {
      return `col-lg-${12 - (this.menuWidth * 2)}`;
    },
    sidebarClass() {
      return `col-lg-${this.sidebarWidth}`;
    },
    loading() {
      return this.$store.state.ui.mainLoader || this.manualLoading;
    },
  },
};
</script>
