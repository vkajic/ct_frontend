<template>
  <div class="experience-preview">
    <h2 class="mb-3">Experience</h2>

    <a class="btn btn-round btn-outline-primary mb-5"
       :href="resumeUrl"
       target="_blank"
       v-if="resumeExists">
      See Resume
    </a>

    <experience-preview-item class="mb-5" v-for="(item, index) in items" :key="index" :item="item"/>
  </div>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
import ExperiencePreviewItem from './ExperiencePreviewItem.vue';

export default {
  name: 'ExperiencePreview',
  components: { ExperiencePreviewItem },
  props: {
    items: {
      type: Array,
      default() {
        return [];
      },
    },
    resume: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    resumeUrl() {
      return this.resume && this.resume.fileName
        ? `${process.env.VUE_APP_PUBLIC_BUCKET}${this.resume.fileName}`
        : null;
    },
    resumeExists() {
      return this.resume && Object.keys(this.resume).length;
    },
  },
};
</script>
