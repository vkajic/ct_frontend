<template>
  <div>
    <h1 class="mb-5 d-none d-lg-block">Projects</h1>

    <b-form @submit.prevent="save" class="m-0">
      <div v-for="(item, index) in $v.items.$each.$iter" :key="index">
        <div class="row">
          <div class="col-4">
            <image-uploader label="Add cover image"
                            title="Cover"
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

      <funnel-buttons skip-url="/create-freelancer/preview"
                      :saving="saving"
                      :submit-text="saveButtonText"/>
    </b-form>
  </div>
</template>

<script>
import { required } from 'vuelidate/src/validators';
import ImageUploader from '../form/ImageUploader.vue';
import InputGroup from '../form/InputGroup.vue';
import TextareaGroup from '../form/TextareaGroup.vue';
import GalleryUploader from '../form/GalleryUploader.vue';
import FunnelButtons from './FunnelButtons.vue';

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
    FunnelButtons,
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
    skipEnabled: {
      type: Boolean,
      default: true,
    },
    saveButtonText: {
      type: String,
      default: 'Preview profile',
    },
    redirectionEnabled: {
      type: Boolean,
      default: true,
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
          if (this.redirectionEnabled) {
            this.$router.push('/create-freelancer/preview');
          } else {
            this.$store.dispatch('ui/showNotification', {
              type: 'success',
              text: 'Projects saved',
            });
          }
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
