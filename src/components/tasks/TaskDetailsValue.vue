<template>
  <div class="detail d-flex align-items-center">
    <credit-card-icon size="20" class="mr-3"/>
    <div>
      <div class="small-heading">
        VALUE
      </div>
      <task-price :task="task"/>
    </div>
  </div>
</template>

<script>
import {
  CreditCardIcon,
} from 'vue-feather-icons';
import TaskPrice from './TaskPrice.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'TaskDetailsValue',
  components: {
    TaskPrice,
    CreditCardIcon,
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
  .price {
    font-weight: bold;
  }
</style>
