<template>
  <header class="main-header d-flex align-items-center mb-3 mb-lg-0">
    <div class="container">
      <div class="row align-items-center">
        <div
          class="col-6 col-lg-3 d-flex text-md-left text-center align-content-center">
          <div class="py-2">
            <router-link to="/">
              <span class="back">
                <img src="@/assets/img/cryptotask-logo.svg" alt="Cryptotask"/>
              </span>
            </router-link>
          </div>
        </div>
        <div class="col-lg-6 d-none d-lg-flex align-content-center">
          <top-menu/>
        </div>
        <div class="col-6 col-lg-3 d-flex justify-content-end align-content-center">
          <user-info/>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import TopMenu from '../../components/layout/TopMenu.vue';
import UserInfo from '../../components/ui/UserInfo.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'MainLayoutHeader',
  components: { UserInfo, TopMenu },
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
