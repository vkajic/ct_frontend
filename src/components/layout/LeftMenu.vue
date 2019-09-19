<template>
  <div>
    <freelancer-menu v-if="activeRole === 'freelancer'"/>
    <client-menu v-if="activeRole === 'client'"/>
  </div>
</template>

<script>
import FreelancerMenu from './FreelancerMenu.vue';
import ClientMenu from './ClientMenu.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'LeftMenu',
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
