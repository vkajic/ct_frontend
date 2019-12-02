<template>
  <ul class="list-tags list-unstyled list-inline">
    <li class="list-inline-item" v-for="(tag, index) in tags" :key="index">
      <template v-if="linkable">
        <a class="tag-item d-block mb-2" href="#"
           @click.prevent="$emit('click', tag)">{{tag.name}}</a>
      </template>
      <template v-else>
        <div class="tag-item mb-2">{{tag.name}}</div>
      </template>
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
    linkable: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
