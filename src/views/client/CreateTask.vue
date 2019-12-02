<template>
  <page-wrapper :menu-width="2">
    <div class="row">
      <div class="col-12 col-lg-9">
        <paper>
          <task-form/>
        </paper>
      </div>
    </div>
  </page-wrapper>
</template>

<script>
import TaskForm from '../../components/tasks/TaskForm.vue';
import PageWrapper from '../../components/ui/PageWrapper.vue';
import Paper from '../../components/ui/Paper.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'CreateTask',
  components: {
    Paper,
    PageWrapper,
    TaskForm,
  },
};
</script>
