<template>
  <b-form @submit.prevent="save" class="m-0">
    <div class="row">
      <div class="col-4">
        <image-uploader label="Add cover image"/>
      </div>
      <div class="col-8">
        <input-group name="title"
                     class="mb-3"
                     v-model="form.title"
                     placeholder="Project Title"
                     label="Title"/>

        <textarea-group name="description"
                        class="mb-3"
                        v-model="form.description"
                        label="Description"/>

        <gallery-uploader label="Add images" class="mb-3"/>

        <input-group name="link"
                     class="mb-3"
                     v-model="form.link"
                     placeholder="Project link"
                     label="Link"/>

        <input-group name="tags"
                     class="mb-3"
                     v-model="form.tags"
                     placeholder="Mobile app, Android, iOS"
                     label="Tags"/>
      </div>
    </div>
    <hr class="mb-5 d-block">
  </b-form>
</template>

<script>
import { required } from 'vuelidate/src/validators';
import ImageUploader from '../form/ImageUploader.vue';
import InputGroup from '../form/InputGroup.vue';
import TextareaGroup from '../form/TextareaGroup.vue';
import GalleryUploader from '../form/GalleryUploader.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ProjectItemForm',
  components: {
    GalleryUploader,
    TextareaGroup,
    InputGroup,
    ImageUploader,
  },
  props: {
    project: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  validations: {
    form: {
      title: {
        required,
      },
    },
  },
  data() {
    return {
      form: {
        title: '',
        description: '',
        link: '',
        tags: '',
      },
    };
  },
  methods: {
    save() {
      this.$v.$touch();
    },
  },
};
</script>
