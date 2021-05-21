<template>
  <div class="experience-preview">
    <h2 class="mb-3">{{$t('freelancer_info.experience')}}</h2>
    <div v-html="resume" class="text-wrap"></div>
    <experience-preview-item class="mb-5" v-for="(item, index) in items" :key="index" :item="item"/>
  </div>
</template>

<script>
import ExperiencePreviewItem from './ExperiencePreviewItem.vue';

// noinspection JSUnusedGlobalSymbols
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
      type: String,
      default: null,
    },
  },
};
</script>
