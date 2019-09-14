<template>
  <div>
    <h1 class="mb-5">Work experience</h1>

    <file-uploader @input="resumeUpload" class="mb-5" label="Upload resume"/>

    <experience-item-form v-for="(item, index) in items"
                          :key="index"
                          :item="item"
                          @input="updateItem($event, index)"/>

    <div>
      <a href="#" @click="addExperience"><u>Add work experience</u></a><br>
      <small class="text-muted">
        Not required but recommended to enter at least last three positions
      </small>
    </div>

    <div class="pt-5 d-flex justify-content-end align-items-center">
      <router-link to="/create-freelancer/projects" class="mr-3">Skip for now</router-link>
      <b-button type="submit" variant="primary" class="btn-round">
        Next: Add Projects
      </b-button>
    </div>
  </div>
</template>

<script>
import FileUploader from '../form/FileUploader.vue';
import ExperienceItemForm from './ExperienceItemForm.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ExperienceForm',
  components: {
    ExperienceItemForm,
    FileUploader,
  },
  data() {
    return {
      items: [],
    };
  },
  methods: {
    addExperience(e) {
      e.preventDefault();
      this.items.push({});
    },
    updateItem($event, index) {
      this.items[index] = $event;
    },
    resumeUpload(e) {
      console.log(e);
    },
  },
};
</script>
