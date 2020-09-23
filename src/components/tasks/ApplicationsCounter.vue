<template>
  <div class="d-flex align-items-center applications-count"
       v-b-tooltip.hover :title="$t('tasks.applied_freelancers')">
    <user-icon size="16"/> {{count}}
  </div>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
import { UserIcon } from 'vue-feather-icons';

export default {
  name: 'ApplicationsCounter',
  components: {
    UserIcon,
  },
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style scoped>

</style>
