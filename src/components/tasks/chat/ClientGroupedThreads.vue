<template>
  <div>
    <client-grouped-thread-group v-for="group in groups" :key="group" :group-id="group"
                                 :threads="threads"
                                 @click="openThread"/>
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
      default() {
        return [];
      },
    },
  },
  computed: {
    groups() {
      return uniq(this.threads.map(t => t.taskId));
    },
  },
  methods: {
    /**
     * Open thread for selected application
     * @param thread
     */
    openThread(thread) {
      this.$emit('click', thread);
    },
  },
};
</script>
