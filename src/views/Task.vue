<template>
  <div class="task row">
    <div class="col-6 offset-3">
      <h1>Senior Product Designer</h1>
      <small-employer :employer="{'name': 'Abstract'}"/>
    </div>
    <div class="col-2">
      <task-details class="mt-7"/>
      <required-skills class="skills"/>
    </div>
  </div>
</template>

<script>
import SmallEmployer from '../components/tasks/SmallEmployer.vue';
import TaskDetails from '../components/tasks/TaskDetails.vue';
import RequiredSkills from '../components/tasks/RequiredSkills.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Task',
  components: {
    RequiredSkills,
    TaskDetails,
    SmallEmployer,
  },
};
</script>
