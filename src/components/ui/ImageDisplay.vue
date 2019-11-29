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
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    src() {
      const imageRequest = JSON.stringify({
        bucket: process.env.VUE_APP_PUBLIC_BUCKET,
        key: this.file.fileName,
        edits: this.options,
      });
      return `${process.env.VUE_APP_IMAGE_BASE_URL}/${btoa(imageRequest)}`;
    },
  },
};
</script>
