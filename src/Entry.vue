<template>
  <router-view/>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Entry',
  created() {
    // init users data
    this.$store.dispatch('user/init');

    // load static data
    this.$store.dispatch('util/getSkills');
    this.$store.dispatch('util/getLanguages');
  },
};
</script>
