<template>
  <ul class="task-tags list-unstyled list-inline mb-4">
    <li class="list-inline-item" v-for="(tag, index) in tags" :key="index">{{tag[nameLabel]}}</li>
  </ul>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'TaskTags',
  props: {
    tags: {
      type: Array,
      default() {
        return [];
      },
    },
    nameLabel: {
      type: String,
      default: 'name',
    },
  },
};
</script>
