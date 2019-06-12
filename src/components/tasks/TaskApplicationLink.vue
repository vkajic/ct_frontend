<template>
  <div class="row">
    <div class="col-md-12 text-center">
      <router-link :to="{ name: 'application', params: { id: application.id } }"
                   class="btn btn-blue">
        Go to application
      </router-link>
    </div>
  </div>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'TaskApplicationLink',
  props: {
    task: {
      type: Object,
      required: true,
    },
    application: {
      type: Object,
    },
  },
};
</script>
