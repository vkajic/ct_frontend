<template>
  <a :href="url" class="project-preview mb-5 pr-4 d-block">
    <image-display :file="project.cover" :alt="project.title" class="mb-3"/>
    <h6 class="mb-0">{{project.title}}</h6>
    <div class="text-muted"><small>{{tags}}</small></div>
  </a>
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
      return this.project.tags ? this.project.tags.split(',')
        .map(t => t.trim())
        .join(' / ') : ' ';
    },
    url() {
      if (this.project.link) {
        const regex = /^(http|https)/;
        if (this.project.link.length > 3 && !this.project.link.match(regex)) {
          return `http://${this.project.link}`;
        }

        return this.project.link;
      }
      return null;
    },
  },
};
</script>
