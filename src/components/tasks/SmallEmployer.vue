<template>
  <div class="employer d-flex align-items-center">
    <avatar-display :avatar="employer.avatar" v-if="employer.avatar"/>
    {{employer.name}}
  </div>
</template>

<script>
import AvatarDisplay from '../ui/AvatarDisplay.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'SmallEmployer',
  components: { AvatarDisplay },
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
