<template>
  <div class="task">
    <div class="row">
      <div class="col-md-2">
        <back-button/>
      </div>
      <div class="col-md-8 center">
        <h1>Post task</h1>
      </div>
      <div class="col-md-2"></div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="block newtask">
          <task-form/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TaskForm from '../components/tasks/TaskForm.vue';
import BackButton from '../components/BackButton.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'CreateTask',
  components: {
    BackButton,
    TaskForm,
  },
};
</script>
