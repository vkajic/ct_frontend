<template>
  <div>
    <main-layout-header/>
    <div class="d-flex flex-column align-items-center justify-content-center">
      <h1 class="display-1">404</h1>
      <h2>{{ $t('404.not_found') }}</h2>
      <router-link to="/">{{ $t('404.back') }}</router-link>
    </div>
  </div>
</template>

<script>
import MainLayoutHeader from '../../layouts/main/MainLayoutHeader.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: '404',
  components: { MainLayoutHeader },
};
</script>
