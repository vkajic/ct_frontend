<template>
  <header class="main-header">
    <div class="container">
      <div class="row align-items-center">
        <div
          class="col-md-3 d-flex text-md-left text-center align-content-center">
          <div class="logo">
            <router-link to="/">
              <span class="back"><img src="@/assets/img/ct-logo.svg" alt="Cryptotask"/></span>
            </router-link>
          </div>
        </div>
        <div class="col-md-6 d-flex align-content-center">
          <top-menu/>
        </div>
        <div class="col-md-3 d-flex justify-content-end align-content-center">
          <header-menu/>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
import HeaderMenu from '../../components/HeaderMenu.vue';
import TopMenu from '../../components/layout/TopMenu.vue';

export default {
  name: 'MainLayoutHeader',
  components: { TopMenu, HeaderMenu },
  data() {
    return {
      balance: 0,
      allowance: 0,
      myStake: 0,
      totalStake: 0,
    };
  },
};
</script>
