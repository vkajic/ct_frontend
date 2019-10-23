<template>
  <div class="project-preview mb-5">
    <image-display :file="project.cover" :alt="project.title" class="mb-3"/>
    <h6 class="mb-0">{{project.title}}</h6>
    <div class="text-muted"><small>{{tags}}</small></div>
  </div>
</template>

<script>
import ImageDisplay from '../ui/ImageDisplay.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ProjectsPreviewItem',
  components: { ImageDisplay },
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  computed: {
    tags() {
      return this.project.tags ? this.project.tags.split(',').map(t => t.trim()).join(' / ') : ' ';
    },
  },
};
</script>
