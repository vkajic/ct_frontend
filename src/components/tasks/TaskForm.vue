<template>
  <div class="row">
    <div class="col-12">
      <h1 class="mb-5">{{ title }}</h1>

      <b-form @submit.prevent="saveTask">
        <input-group name="title"
                     class="mb-3"
                     v-model="form.title"
                     placeholder="Job title"
                     label="Title"
                     :validation="$v.form.title"/>

        <div class="row">
          <div class="col-6">
            <input-group name="duration"
                         class="mb-3"
                         v-model="form.duration"
                         placeholder="Job duration"
                         label="Duration"
                         :validation="$v.form.duration">
              <template slot="append">days</template>
            </input-group>
          </div>
          <div class="col-6">
            <input-group name="price"
                         class="mb-3"
                         v-model="form.price"
                         placeholder="Job value"
                         label="Value"
                         :validation="$v.form.price">
              <template slot="prepend">$</template>
            </input-group>
          </div>
        </div>

        <input-tags label="Required skills"
                    class="mb-3"
                    v-model="form.skills"
                    placeholder="Select skills"
                    :options="skills"
                    options-label="name"/>

        <textarea-group name="description"
                        class="mb-4"
                        v-model="form.description"
                        label="Description"
                        :rows="12"
                        :validation="$v.form.description"/>

        <div class="pt-5 d-flex justify-content-end align-items-center">
          <b-button type="submit" variant="info" class="btn-round" :disabled="sending">
            <template v-if="!sending">Post job</template>
            <template v-if="sending">Saving...</template>
          </b-button>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import {
  required, integer, minValue, decimal,
} from 'vuelidate/lib/validators';
import InputGroup from '../form/InputGroup.vue';
import InputTags from '../form/InputTags.vue';
import TextareaGroup from '../form/TextareaGroup.vue';

// TODO add attachments uploader

const initialForm = {
  title: null,
  description: null,
  price: null,
  duration: null,
  published: false,
  attachments: [],
};

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'TaskForm',
  components: {
    TextareaGroup,
    InputTags,
    InputGroup,
  },
  props: {
    title: {
      type: String,
      default: 'Post new job',
    },
    task: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      form: Object.assign({}, initialForm),
      sending: false,
    };
  },
  watch: {
    task(nv) {
      if (nv) {
        this.form = Object.assign({}, this.form, this.task);
      }
    },
  },
  mounted() {
    if (this.task) {
      this.form = Object.assign({}, this.form, this.task);
    }
  },
  validations: {
    form: {
      title: {
        required,
      },
      description: {
        required,
      },
      price: {
        required,
        decimal,
        minValue: minValue(1),
      },
      duration: {
        required,
        integer,
        minValue: minValue(1),
      },
    },
  },
  computed: {
    disputedPrice() {
      if (this.form.price !== undefined) {
        return Math.round(this.form.price / 100 * 10);
      }

      return '';
    },

    /**
     * Get all skills for dropdown
     */
    skills() {
      return this.$store.getters['util/getAllSkills'];
    },
  },
  methods: {
    /**
     * Persist task data
     */
    async saveTask() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.sending = true;

        try {
          if (!this.task || !this.task.id) {
            await this.$store.dispatch('tasks/create', this.form);
            this.form = Object.assign({}, initialForm);
          } else {
            await this.$store.dispatch('tasks/update', {
              id: this.task.id,
              data: this.form,
            });
          }
          this.$v.$reset();
          this.sending = false;
          this.$store.dispatch('ui/showNotification', {
            type: 'success',
            text: 'Task saved successfully',
          });
          if (!this.task) {
            this.$router.push('/');
          }
        } catch (err) {
          this.sending = false;
          this.$store.dispatch('ui/showNotification', {
            type: 'danger',
            text: `Task save failed. ${err.response.data.message}`,
          });
        }
      }
    },

    /**
     * Attach files to form
     * @param files
     */
    attach(files) {
      this.form.attachments = files;
    },
  },
};
</script>
