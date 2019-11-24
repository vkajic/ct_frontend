<template>
  <div class="mobile-menu position-fixed fixed-bottom w-100 d-lg-none" v-if="activeRole">
    <freelancer-menu v-if="activeRole === 'freelancer'"/>
    <client-menu v-if="activeRole === 'client'"/>
  </div>
</template>

<script>
import FreelancerMenu from './FreelancerMenu.vue';
import ClientMenu from './ClientMenu.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'MobileMenu',
  components: {
    ClientMenu,
    FreelancerMenu,
  },
  computed: {
    activeRole() {
      return this.$store.state.user.activeRole;
    },
  },
};
</script>
