<template>
  <header class="mb-5">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-3 text-md-left text-lg-left text-xl-left text-center">
          <div class="logo">
            <router-link to="/">
              <span class="back"><img src="@/assets/img/logo.svg" alt="Cryptotask"/></span>
            </router-link>
          </div>
        </div>
        <div class="col-md-9 d-flex justify-content-end align-content-center">
          <!--<div class="header-data text-md-right text-lg-right text-xl-right text-center">
            <p class="m-0">
              <span>Wallet: {{balance}} CTF</span><span
              class="normal"> ⎜ </span><span>Allowance: {{allowance}} CTF</span>
              <router-link to="/funds/allowanceInc">Increase</router-link>
              /
              <router-link to="/funds/allowanceDec">Decrease</router-link>
              <span class="normal"> ⎜ </span><span>Stake: {{myStake}} CTF</span>
              <router-link to="/funds/stakeAdd">Add</router-link>
              /
              <router-link to="/funds/stakeWithdraw">Withdraw</router-link>
            </p></div>-->
          <header-menu/>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
import HeaderMenu from '../../components/HeaderMenu.vue';

export default {
  name: 'MainLayoutHeader',
  components: { HeaderMenu },
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
