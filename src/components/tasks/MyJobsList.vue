<template>
  <div>
    <short-job-item/>
    <short-job-item/>
  </div>
</template>

<script>
import ShortJobItem from './ShortJobItem.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'MyJobsList',
  components: { ShortJobItem },
};
</script>
