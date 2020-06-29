<template>
  <div>
    <main-layout-header/>
    <div class="container">
      <global-notification/>
      <div class="row">
        <div class="col-12">
          <slot/>
          <loading-overlay :visible="loading"/>
        </div>
      </div>
    </div>
    <main-layout-footer/>
  </div>
</template>

<script>
import MainLayoutHeader from '../main/MainLayoutHeader.vue';
import MainLayoutFooter from '../main/MainLayoutFooter.vue';
import GlobalNotification from '../../components/ui/GlobalNotification.vue';
import LoadingOverlay from '../../components/ui/LoadingOverlay.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ProfileLayout',
  components: {
    LoadingOverlay,
    GlobalNotification,
    MainLayoutFooter,
    MainLayoutHeader,
  },
  computed: {
    /**
     * Is loading activated
     * @return {boolean|default.props.manualLoading|{default, type}}
     */
    loading() {
      return this.$store.state.ui.mainLoader || this.manualLoading;
    },
  },
};
</script>

<style scoped>

</style>
