<template>
  <div>
    <h1 class="mb-5">Projects</h1>

    <project-item-form v-for="(project, index) in projects" :key="index" :project="project"/>

    <a href="#" @click="addProject"><u>Add project</u></a>

    <div class="pt-5 d-flex justify-content-end align-items-center">
      <router-link to="/create-freelancer/preview" class="mr-3">Skip for now</router-link>
      <b-button type="submit" variant="primary" class="btn-round">
        Preview profile
      </b-button>
    </div>
  </div>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
import ProjectItemForm from './ProjectItemForm.vue';

export default {
  name: 'ProjectsForm',
  components: { ProjectItemForm },
  data() {
    return {
      projects: [],
    };
  },
  methods: {
    addProject(e) {
      e.preventDefault();
      this.projects.push({});
    },
  },
};
</script>
