<template>
  <router-view/>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Entry',
  created() {
    // load static data
    this.$store.dispatch('util/getSkills');
    this.$store.dispatch('util/getLanguages');
  },
};
</script>
