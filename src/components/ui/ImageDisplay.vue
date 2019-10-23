<template>
  <img :src="src" :alt="alt" v-if="src"/>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ImageDisplay',
  props: {
    file: {
      type: Object,
      default() {
        return {};
      },
    },
    alt: {
      type: String,
      default: null,
    },
    thumbnail: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    src() {
      return this.file && this.file.fileName
        ? `${process.env.VUE_APP_PUBLIC_BUCKET}${this.thumbnail ? 'thumbnails/' : null}${this.file.fileName}`
        : null;
    },
  },
};
</script>
