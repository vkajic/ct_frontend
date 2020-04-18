<template>
  <div>
    <client-grouped-thread-group v-for="group in groups" :key="group" :group-id="group"
                                 :threads="threads"/>
  </div>
</template>

<script>
import uniq from 'lodash/uniq';
import ClientGroupedThreadGroup from './ClientGroupedThreadGroup.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ClientGroupedThreads',
  components: {
    ClientGroupedThreadGroup,
  },
  props: {
    threads: {
      type: Array,
      required: true,
    },
  },
  computed: {
    groups() {
      return uniq(this.threads.map(t => t.taskId));
    },
  },
};
</script>
