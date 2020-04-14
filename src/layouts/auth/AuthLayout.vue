<template>
  <div>
    <main-layout-header/>
    <div class="container">
      <global-notification/>
      <div class="row">
        <div class="col-12">
          <router-view/>
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
import LoadingOverlay from '../../components/ui/LoadingOverlay.vue';
import GlobalNotification from '../../components/ui/GlobalNotification.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'AuthLayout',
  components: {
    GlobalNotification,
    LoadingOverlay,
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
