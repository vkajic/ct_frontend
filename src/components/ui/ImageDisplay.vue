<template>
  <img :src="src" :alt="alt" v-if="src"/>
</template>

<script>
import { Base64 } from 'js-base64';

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
      try {
        const imageRequest = JSON.stringify({
          bucket: process.env.VUE_APP_PUBLIC_BUCKET,
          key: this.file.fileName,
          edits: Object.assign({}, this.options, { rotate: null }),
        });
        return `${process.env.VUE_APP_IMAGE_BASE_URL}/${Base64.encode(imageRequest)}`;
      } catch (err) {
        return null;
      }
    },
  },
};
</script>
