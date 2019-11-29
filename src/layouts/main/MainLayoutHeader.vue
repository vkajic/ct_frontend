<template>
  <header class="main-header d-flex align-items-center mb-3 mb-lg-0">
    <div class="container">
      <div class="row align-items-center">
        <div
          class="col-5 col-lg-3 col-xxl-2 d-flex text-md-left text-center align-content-center">
          <logo-back/>
        </div>
        <div class="d-none col-lg-7 col-xxl-8 d-lg-flex align-content-center">
          <top-menu/>
        </div>
        <div class="col-7 col-lg-2 d-flex justify-content-end align-content-center">
          <user-info/>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import TopMenu from '../../components/layout/TopMenu.vue';
import UserInfo from '../../components/ui/UserInfo.vue';
import LogoBack from '../../components/ui/LogoBack.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'MainLayoutHeader',
  components: {
    LogoBack,
    UserInfo,
    TopMenu,
  },
};
</script>
