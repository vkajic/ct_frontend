<template>
  <div class="short-task-item">
    <div class="d-flex align-items-center justify-content-between mb-2">
      <div class="client-name">MapDriver</div>
      <div class="published-date">Aug 20</div>
    </div>
    <h4><a href="#">Python Dev needed for Mobile CRM System</a></h4>
    <div class="d-flex align-items-center mb-3">
      <div class="duration pr-3">3-4 months</div>
      <div class="price">20 ETH</div>
    </div>

    <task-tags/>

    <hr class="mb-4">
  </div>
</template>

<script>
import TaskTags from './TaskTags.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ShortTaskItem',
  components: { TaskTags },
};
</script>
