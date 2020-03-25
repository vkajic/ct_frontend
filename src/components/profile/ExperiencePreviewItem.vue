<template>
  <div class="row">
    <div class="col-12 col-lg-4">
      <h5>{{item.title}}</h5>
      <p>{{item.company}}</p>
      <p class="text-muted">
        {{item.from | date('YYYY')}} -
        <span v-if="item.to">{{item.to | date('YYYY')}}</span>
        <span v-if="!item.to">Present</span>
      </p>
    </div>
    <div class="col-12 col-lg-8" v-html="item.description"></div>
  </div>
</template>

<script>
import { dateFilter } from 'vue-date-fns';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ExperiencePreviewItem',
  filters: {
    date: dateFilter,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>
