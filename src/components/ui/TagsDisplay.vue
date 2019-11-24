<template>
  <ul class="list-tags list-unstyled list-inline">
    <li class="list-inline-item" v-for="(tag, index) in tags" :key="index">
      <div class="tag-item mb-2">{{tag.name}}</div>
    </li>
  </ul>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'TagsDisplay',
  props: {
    tags: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
