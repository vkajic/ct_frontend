<template>
  <div>
    <main-layout-header/>
    <div class="container">
      <global-notification/>
      <router-view/>
    </div>
    <main-layout-footer/>
  </div>
</template>

<script>
import MainLayoutHeader from './MainLayoutHeader.vue';
import MainLayoutFooter from './MainLayoutFooter.vue';
import GlobalNotification from '../../components/GlobalNotification.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'MainLayout',
  components: {
    GlobalNotification,
    MainLayoutFooter,
    MainLayoutHeader,
  },
};
</script>
