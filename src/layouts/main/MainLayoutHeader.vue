<template>
  <header class="main-header d-flex align-items-center mb-3 mb-lg-0">
    <div class="container">
      <div class="row align-items-center">
        <div
          class="col-5 col-xl-3 col-xxl-2 d-flex text-md-left text-center align-content-center">
          <logo-back/>
        </div>
        <div class="d-none col-xl-6 col-xxl-7 d-xl-flex align-content-center px-0">
          <top-menu/>
        </div>
        <div class="col-7 col-xl-3 d-flex justify-content-end align-content-center ml-auto">
          <theme-toggler/>
          <language-switcher/>
          <user-info/>
          <mobile-top-menu class="d-xl-none"/>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import TopMenu from '../../components/layout/TopMenu.vue';
import MobileTopMenu from '../../components/layout/MobileTopMenu.vue';
import UserInfo from '../../components/ui/UserInfo.vue';
import LogoBack from '../../components/layout/LogoBack.vue';
import ThemeToggler from '../../components/ui/ThemeToggler.vue';
import LanguageSwitcher from '../../components/ui/LanguageSwitcher.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'MainLayoutHeader',
  components: {
    LanguageSwitcher,
    ThemeToggler,
    LogoBack,
    UserInfo,
    TopMenu,
    MobileTopMenu,
  },
};
</script>
