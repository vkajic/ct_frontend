<template>
  <div>
    <b-badge variant="success" v-if="application.status === 2">Completed</b-badge>
    <b-badge variant="danger" v-if="application.status === 3">Canceled</b-badge>
  </div>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ApplicationStatusBadge',
  props: {
    application: {
      type: Object,
      required: true,
    },
  },
};
</script>
