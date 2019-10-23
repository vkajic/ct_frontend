<template>
  <page-wrapper :menu-width="2">
    <div class="paper px-7 py-6">
      <task-form/>
    </div>
  </page-wrapper>
</template>

<script>
import TaskForm from '../../components/tasks/TaskForm.vue';
import PageWrapper from '../../components/ui/PageWrapper.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'CreateTask',
  components: {
    PageWrapper,
    TaskForm,
  },
};
</script>
