<template>
  <div class="row no-gutters">
    <div class="col-12 col-lg-4" v-for="p in projects" :key="p.id">
      <projects-preview-item :project="p"/>
    </div>
  </div>
</template>

<script>
import ProjectsPreviewItem from './ProjectsPreviewItem.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ProjectsPreview',
  components: { ProjectsPreviewItem },
  props: {
    projects: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
