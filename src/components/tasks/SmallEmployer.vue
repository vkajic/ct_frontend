<template>
  <div class="employer d-flex align-items-center">
    <img v-if="employer.logo" :src="employer.logo" :alt="employer.name"/>
    {{employer.name}}
  </div>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'SmallEmployer',
  props: {
    employer: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
