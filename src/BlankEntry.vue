<template>
  <div class="row">
    <div class="col-12">
      <router-view/>
      <loading-overlay :visible="loading"/>
    </div>
  </div>
</template>

<script>
import LoadingOverlay from './components/ui/LoadingOverlay.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'BlankLayout',
  components: { LoadingOverlay },
  created() {
    // load static data
    this.$store.dispatch('util/getSkills');
    this.$store.dispatch('util/getLanguages');
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
