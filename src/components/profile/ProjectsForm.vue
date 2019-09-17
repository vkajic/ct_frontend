<template>
  <div>
    <h1 class="mb-5">Projects</h1>

    <b-form @submit.prevent="save" class="m-0">
      <div v-for="(item, index) in $v.items.$each.$iter" :key="index">
        <div class="row">
          <div class="col-4">
            <image-uploader label="Add cover image"
                            @input="coverAdded($event, index)"
                            :value="item.cover.$model"
                            type="public"
                            @remove="coverRemoved(index)"/>
          </div>
          <div class="col-8">
            <input-group name="title"
                         class="mb-3"
                         v-model="item.title.$model"
                         placeholder="Project Title"
                         label="Title"
                         :validation="item.title"/>

            <textarea-group name="description"
                            class="mb-3"
                            v-model="item.description.$model"
                            label="Description"
                            :validation="item.description"/>

            <gallery-uploader label="Add images"
                              :value="item.images.$model"
                              type="public"
                              class="mb-3"
                              @input="setImages($event, index)"/>

            <input-group name="link"
                         class="mb-3"
                         v-model="item.link.$model"
                         placeholder="Project link"
                         label="Link"
                         :validation="item.link"/>

            <input-group name="tags"
                         class="mb-3"
                         v-model="item.tags.$model"
                         placeholder="Mobile app, Android, iOS"
                         label="Tags"
                         :validation="item.tags"/>
          </div>

        </div>

        <hr class="mb-5 d-block">
      </div>

      <a href="#" @click="addProject"><u>Add project</u></a>

      <div class="pt-5 d-flex justify-content-end align-items-center">
        <router-link to="/create-freelancer/preview" class="mr-3">Skip for now</router-link>
        <b-button type="submit" variant="primary" class="btn-round" :disabled="saving">
          <template v-if="!saving">Preview profile</template>
          <template v-if="saving">Saving...</template>
        </b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import { required } from 'vuelidate/src/validators';
import ImageUploader from '../form/ImageUploader.vue';
import InputGroup from '../form/InputGroup.vue';
import TextareaGroup from '../form/TextareaGroup.vue';
import GalleryUploader from '../form/GalleryUploader.vue';

const initialForm = {
  title: null,
  link: null,
  tags: null,
  description: null,
};

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ProjectsForm',
  components: {
    GalleryUploader,
    TextareaGroup,
    InputGroup,
    ImageUploader,
  },
  props: {
    freelancer: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      items: [],
      saving: false,
    };
  },
  validations: {
    items: {
      $each: {
        cover: {},
        link: {
          required,
        },
        title: {
          required,
        },
        tags: {},
        description: {
          required,
        },
        images: {},
      },
    },
  },
  methods: {
    addProject(e) {
      e.preventDefault();
      this.items.push(Object.assign({}, initialForm));
    },

    coverAdded(e, index) {
      this.items[index].cover = e;
    },

    coverRemoved(index) {
      this.items[index].cover = null;
    },

    setImages(e, index) {
      this.items[index].images = e;
    },

    /**
     * Save form data
     * @return {Promise<void>}
     */
    async save() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saving = true;

        try {
          await this.$store.dispatch('user/updateFreelancerProjects', this.items);
          this.saving = false;
          this.$router.push('/create-freelancer/preview');
        } catch (err) {
          this.$store.dispatch('ui/showNotification', {
            type: 'danger',
            text: err.message,
          });
          this.saving = false;
        }
      }
    },
  },
  watch: {
    freelancer(n) {
      if (n && n.projects) {
        this.items = [...n.projects];
      }
    },
  },
  mounted() {
    if (this.freelancer && this.freelancer.projects) {
      this.items = [...this.freelancer.projects];
    }
  },
};
</script>
