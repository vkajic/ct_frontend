<template>
  <div class="row">
    <div class="col-2 pt-5">
      <left-menu/>
    </div>
    <div class="col-8">
      <div class="paper px-7 py-6">
        <task-form/>
      </div>
    </div>
  </div>
</template>

<script>
import TaskForm from '../../components/tasks/TaskForm.vue';
import LeftMenu from '../../components/layout/LeftMenu.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'CreateTask',
  components: {
    LeftMenu,
    TaskForm,
  },
};
</script>
