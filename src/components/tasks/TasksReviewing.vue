<template>
  <div>
    <div class="col-title text-center">
      <a class="btn btn-white" @click="checkDisputes">Load</a>
      <h3>Tasks I am reviewing</h3>
    </div>
  </div>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'TasksReviewing',
  methods: {
    checkDisputes() {
      //
    },
  },
};
</script>

<style scoped>
  .btn {
    cursor: pointer;
  }
</style>
