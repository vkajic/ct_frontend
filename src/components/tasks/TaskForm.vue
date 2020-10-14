<template>
  <div class="row">
    <div class="col-12">
      <h1 class="mb-5">{{ title }}</h1>

      <b-form @submit.prevent="saveTask">
        <input-group name="title"
                     class="mb-3"
                     v-model="form.title"
                     :placeholder="$t('tasks.form.job_title')"
                     :label="$t('tasks.form.job_label')"
                     :validation="$v.form.title"/>

        <div class="row">
          <div class="col-6">
            <input-group name="duration"
                         class="mb-3"
                         v-model="form.duration"
                         :placeholder="$t('tasks.form.job_duration')"
                         :label="$t('tasks.form.duration')"
                         :disabled="form.negotiableDuration"
                         :validation="$v.form.duration">
              <template slot="prepend">{{ $t('tasks.form.days') }}</template>
              <template slot="append">
                <label class="m-0">
                  <input type="checkbox" v-model="form.negotiableDuration">
                  {{ $t('tasks.form.negotiable') }}
                </label>
              </template>
            </input-group>
          </div>
          <div class="col-6">
            <input-group name="price"
                         class="mb-3"
                         v-model="form.price"
                         :placeholder="$t('tasks.form.job_value')"
                         :label="$t('tasks.form.value')"
                         :disabled="form.negotiablePrice"
                         :validation="$v.form.price">
              <template slot="prepend">$</template>
              <template slot="append">
                <label class="m-0">
                  <input type="checkbox" v-model="form.negotiablePrice">
                  {{ $t('tasks.form.negotiable') }}
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
                         :placeholder="$t('tasks.form.job_type')"
                         :label="$t('tasks.form.type')"
                         :options="types"
                         :validation="$v.form.type"/>
          </div>
          <div class="col-6">
            <input-group name="location"
                         class="mb-3"
                         v-model="form.location"
                         :placeholder="$t('tasks.form.job_location')"
                         :label="$t('tasks.form.location')"
                         :options="locations"
                         :validation="$v.form.location"/>
          </div>
        </div>

        <input-tags :label="$t('tasks.form.categories_label')"
                    class="mb-3"
                    v-model="form.categories"
                    :options="categories"
                    :placeholder="$t('tasks.form.select_categories')"
                    options-label="name"/>

        <input-tags :label="$t('tasks.form.skills_label')"
                    class="mb-3"
                    v-model="form.skills"
                    :placeholder="$t('tasks.form.select_skills')"
                    :options="skills"
                    options-label="name"
                    :validation="$v.form.skills"/>

        <wysiwyg-textarea-group id="description"
                                class="mb-4"
                                v-model="form.description"
                                :label="$t('tasks.form.description')"
                                :validation="$v.form.description"/>

        <div class="pt-5 d-flex justify-content-end align-items-center">
          <loading-button type="submit" variant="info" class="btn-round"
                          :loading="sending"
                          :label="$t('tasks.form.button_label')"
                          :loading-label="$t('tasks.form.button_loading')"/>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import {
  required, integer, minValue, decimal, requiredIf, maxLength, minLength,
} from 'vuelidate/lib/validators';
import InputGroup from '@/components/form/InputGroup.vue';
import InputTags from '@/components/form/InputTags.vue';
import WysiwygTextareaGroup from '@/components/form/WysiwygTextareaGroup.vue';
import languageRouter from '@/components/mixins/languageRouter';
import LoadingButton from '@/components/ui/LoadingButton.vue';

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
  type: 'onetime',
  location: 'remote',
};

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'TaskForm',
  components: {
    LoadingButton,
    WysiwygTextareaGroup,
    InputTags,
    InputGroup,
  },
  mixins: [languageRouter],
  props: {
    title: {
      type: String,
      default: '',
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
          text: this.$t('tasks.form.fulltime'),
        },
        {
          value: 'parttime',
          text: this.$t('tasks.form.parttime'),
        },
        {
          value: 'onetime',
          text: this.$t('tasks.form.onetime'),
        },
      ],
      locations: [
        {
          value: 'onsite',
          text: this.$t('tasks.form.onsite'),
        },
        {
          value: 'remote',
          text: this.$t('tasks.form.remote'),
        },
      ],
    };
  },
  watch: {
    task(nv) {
      if (nv) {
        this.form = Object.assign({}, this.form, this.task, {
          categories: this.extractTags(nv.categories),
          skills: this.extractTags(nv.skills),
        });
      }
    },
  },
  mounted() {
    if (this.task) {
      this.form = Object.assign({}, this.form, this.task, {
        categories: this.extractTags(this.task.categories),
        skills: this.extractTags(this.task.skills),
      });
    }
  },
  validations: {
    form: {
      title: {
        required,
        maxLength: maxLength(100),
      },
      description: {
        required,
        maxLength: maxLength(5000),
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
      return this.$store.getters['util/getCategories'];
    },

    /**
     * Get all skills for dropdown
     */
    skills() {
      const selectedIds = this.form.categories ? this.form.categories.map(r => r.id) : [];
      return this.$store.getters['util/getSkillsByCategories'](selectedIds);
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
            this.form = Object.assign({}, this.form, {
              languageId: this.$store.getters['util/getCurrentLanguage'].id,
            });
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
            text: this.$t('tasks.form.success_notification'),
          });
          this.push('/my-tasks');
        } catch (err) {
          console.error(err);
          this.sending = false;
          this.$store.dispatch('ui/showNotification', {
            type: 'danger',
            text: this.$t('tasks.form.error_notification'),
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

    extractTags(tags) {
      const currentLang = this.$store.getters['util/getCurrentLanguage'];

      if (tags && tags.length) {
        return tags.map(tag => ({
          id: tag.id,
          name: tag.translations
            .find(t => t.languageId === currentLang.id).displayTranslation,
        }));
      }
      return [];
    },
  },
};
</script>
