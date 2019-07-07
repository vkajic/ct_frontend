<template>
  <div>
    <h3>Applications</h3>
    <ul class="list-unstyled">
      <li v-for="application in applications" :key="application.id">
        <router-link :to="`/applications/${application.id}`">
          {{application.Freelancer.name}}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'TaskApplicationsList',
  props: {
    task: {
      type: Object,
      required: true,
    },
    applications: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
