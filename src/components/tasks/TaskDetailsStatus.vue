<template>
  <div class="detail d-flex align-items-center">
    <plus-square-icon size="20" class="mr-3"/>
    <div>
      <div class="small-heading">
        STATUS
      </div>
      <strong>{{status}}</strong>
    </div>
  </div>
</template>

<script>
import { PlusSquareIcon } from 'vue-feather-icons';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'TaskDetailsStatus',
  components: {
    PlusSquareIcon,
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  computed: {
    status() {
      const mapping = {
        0: 'Accepting applications',
        1: 'Filled',
        2: 'Accepting applications',
      };

      return mapping[this.task.status];
    },
  },
};
</script>

<style scoped>

</style>
