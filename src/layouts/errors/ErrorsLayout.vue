<template>
  <div>
    <main-layout-header/>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <slot/>
        </div>
      </div>
    </div>
    <main-layout-footer/>
  </div>
</template>

<script>
import MainLayoutHeader from '../main/MainLayoutHeader.vue';
import MainLayoutFooter from '../main/MainLayoutFooter.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ErrorsLayout',
  components: {
    MainLayoutFooter,
    MainLayoutHeader,
  },
};
</script>
