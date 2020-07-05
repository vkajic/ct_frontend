<template>
  <div class="detail d-flex align-items-center">
    <plus-square-icon size="20" class="mr-3"/>
    <div>
      <div class="small-heading">
        {{$t('tasks.details.status')}}
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
        0: this.$t('tasks.details.status_0'),
        1: this.$t('tasks.details.status_1'),
        2: this.$t('tasks.details.status_2'),
      };

      return mapping[this.task.status];
    },
  },
};
</script>

<style scoped>

</style>
