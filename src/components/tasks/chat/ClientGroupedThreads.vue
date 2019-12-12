<template>
  <div class="mb-3">
    <a href="#" @click.prevent="toggleVisibility"
       class="d-flex w-100 mb-2 d-flex align-items-center justify-content-between">
      <h5 class="mb-0">{{groupTitle}}</h5>
      <chevron-down-icon size="1x" v-if="!visible"/>
      <chevron-up-icon size="1x" v-if="visible"/>
    </a>
    <b-collapse v-model="visible">
      <thread v-for="thread in threads"
              :key="thread.id"
              :thread="thread"
              role="client"
              @click="openThread"/>
    </b-collapse>
  </div>
</template>

<script>
import { ChevronDownIcon, ChevronUpIcon } from 'vue-feather-icons';
import Thread from './Thread.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ClientGroupedThreads',
  components: {
    Thread,
    ChevronDownIcon,
    ChevronUpIcon,
  },
  props: {
    threads: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    /**
     * Toggle thread group visibility
     */
    toggleVisibility() {
      this.visible = !this.visible;
    },

    /**
     * Open thread for selected application
     * @param thread
     */
    openThread(thread) {
      this.$emit('click', thread);
    },
  },
  computed: {
    groupTitle() {
      return this.threads[0].task.title;
    },
  },
};
</script>
