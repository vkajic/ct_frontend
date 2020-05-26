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
                         :disabled="form.negotiableDuration"
                         :validation="$v.form.duration">
              <template slot="prepend">days</template>
              <template slot="append">
                <label class="m-0">
                  <input type="checkbox" v-model="form.negotiableDuration">
                  Negotiable
                </label>
              </template>
            </input-group>
          </div>
          <div class="col-6">
            <input-group name="price"
                         class="mb-3"
                         v-model="form.price"
                         placeholder="Job value"
                         label="Value"
                         :disabled="form.negotiablePrice"
                         :validation="$v.form.price">
              <template slot="prepend">$</template>
              <template slot="append">
                <label class="m-0">
                  <input type="checkbox" v-model="form.negotiablePrice">
                  Negotiable
                </label>
              </template>
            </input-group>
          </div>
        </div>

        <div class="row">
          <div class="col-6">
            <input-group name="type"
                         class="mb-3"
                         v-model="form.type"
                         placeholder="Job type"
                         label="Type"
                         :options="types"
                         :validation="$v.form.type"/>
          </div>
          <div class="col-6">
            <input-group name="location"
                         class="mb-3"
                         v-model="form.location"
                         placeholder="Job location"
                         label="Location"
                         :options="locations"
                         :validation="$v.form.location"/>
          </div>
        </div>

        <input-tags label="Task categories"
                    class="mb-3"
                    v-model="form.categories"
                    :options="categories"
                    placeholder="Select categories"
                    options-label="name"/>

        <input-tags label="Required skills"
                    class="mb-3"
                    v-model="form.skills"
                    placeholder="Select skills"
                    :options="skills"
                    options-label="name"
                    :validation="$v.form.skills"/>

        <wysiwyg-textarea-group id="description"
                                class="mb-4"
                                v-model="form.description"
                                label="Description"
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
  required, integer, minValue, decimal, requiredIf, maxLength, minLength,
} from 'vuelidate/lib/validators';
import InputGroup from '../form/InputGroup.vue';
import InputTags from '../form/InputTags.vue';
import WysiwygTextareaGroup from '../form/WysiwygTextareaGroup.vue';

// TODO add attachments uploader

const initialForm = {
  title: null,
  description: null,
  price: null,
  duration: null,
  published: false,
  attachments: [],
  negotiablePrice: false,
  negotiableDuration: false,
};

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'TaskForm',
  components: {
    WysiwygTextareaGroup,
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
      types: [
        {
          value: 'fulltime',
          text: 'Full Time',
        },
        {
          value: 'parttime',
          text: 'Part Time',
        },
        {
          value: 'onetime',
          text: 'One Time',
        },
      ],
      locations: [
        {
          value: 'onsite',
          text: 'On Site',
        },
        {
          value: 'remote',
          text: 'Remote',
        },
      ],
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
    this.form.type = 'onetime';
    this.form.location = 'remote';
  },
  validations: {
    form: {
      title: {
        required,
        maxLength: maxLength(100),
      },
      description: {
        required,
      },
      price: {
        // eslint-disable-next-line func-names
        required: requiredIf(function () {
          return !this.isPriceNegotiable;
        }),
        decimal,
        minValue: minValue(1),
      },
      duration: {
        // eslint-disable-next-line func-names
        required: requiredIf(function () {
          return !this.isDurationNegotiable;
        }),
        integer,
        minValue: minValue(1),
      },
      skills: {
        required,
        minLength: minLength(1),
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

    categories() {
      return this.$store.state.util.skills;
    },

    /**
     * Get all skills for dropdown
     */
    skills() {
      const selectedIds = this.form.categories ? this.form.categories.map(r => r.id) : [];
      const selectedRoles = this.$store.state.util.skills
        .filter(r => selectedIds.indexOf(r.id) > -1);

      const skills = [];

      selectedRoles.forEach((r) => {
        skills.push(...r.skills);
      });

      return skills;
    },

    /**
     * Is price negotiable
     */
    isPriceNegotiable() {
      return this.form.negotiablePrice;
    },

    /**
     * Is duration negotiable
     */
    isDurationNegotiable() {
      return this.form.negotiableDuration;
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
            text: 'Task saved successfully. It will be reviewed and published in next 24 hours.',
          });
          this.$router.push('/my-tasks');
        } catch (err) {
          console.error(err);
          this.sending = false;
          this.$store.dispatch('ui/showNotification', {
            type: 'danger',
            text: 'Task save failed.',
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
