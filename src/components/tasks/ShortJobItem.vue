<template>
  <div class="short-job-item">
    <div class="d-flex align-items-center mb-2">
      <strong>
        <small-employer :employer="{'name': 'Abstract'}"/>
      </strong>
      &nbsp;|&nbsp;
      <div class="active-since">Active since yesterday — 3:23 PM</div>
    </div>
    <h2>
      <router-link to="/task/1">Python Dev needed for Mobile CRM System</router-link>
    </h2>
    <div class="d-flex align-items-center mb-3">
      <div class="pr-3">3-4 months</div>
      <div>20 ETH</div>
    </div>

    <task-tags/>

    <hr class="mb-4">
  </div>
</template>

<script>
import TaskTags from './TaskTags.vue';
import SmallEmployer from './SmallEmployer.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ShortJobItem',
  components: {
    SmallEmployer,
    TaskTags,
  },
};
</script>
