<template>
  <div class="experience-preview">
    <h2 class="mb-3">Experience</h2>

    <b-button variant="outline-primary" class="btn-round mb-5" @click="downloadResume">
      See Resume
    </b-button>

    <experience-preview-item class="mb-5"/>
    <experience-preview-item/>
  </div>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
import ExperiencePreviewItem from './ExperiencePreviewItem.vue';

export default {
  name: 'ExperiencePreview',
  components: { ExperiencePreviewItem },
  methods: {
    downloadResume() {
      console.log('downloading resume');
    },
  },
};
</script>
