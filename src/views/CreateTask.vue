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
          <create-task-form/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CreateTaskForm from '../components/tasks/CreateTaskForm.vue';
import BackButton from '../components/BackButton.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'CreateTask',
  components: {
    BackButton,
    CreateTaskForm,
  },
};
</script>
