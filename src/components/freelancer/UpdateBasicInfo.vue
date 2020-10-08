<template>
  <b-form @submit.prevent="save">
    <div>
      <div class="row">
        <div class="col-12 col-lg-4 d-flex justify-content-center">
          <image-uploader :label="$t('freelancers.image_label')"
                          class="image-uploader-basic mb-5"
                          :title="$t('freelancers.image_title')"
                          @input="avatarAdded"
                          :value="form.avatar"
                          :validation="$v.form.avatar"
                          type="public"
                          @remove="avatarRemoved"
                          :options="avatarOptions"/>
        </div>
        <div class="col-12 col-lg-8">

          <h1 class="mb-5 d-none d-lg-block">{{$t('freelancers.basic_info')}}</h1>

          <div class="mb-3">
            <label>Name</label>
            <b-input-group>
              <input-field name="firstName"
                           v-model="form.firstName"
                           :placeholder="$t('freelancers.first_name')"
                           :disabled="freelancer.published"
                           :validation="$v.form.firstName"/>
              <input-field name="lastName"
                           v-model="form.lastName"
                           :disabled="freelancer.published"
                           :placeholder="$t('freelancers.last_name')"
                           :validation="$v.form.lastName"/>
              <validation-messages :title="$t('freelancers.first_name')"
                                   :validation="$v.form.firstName"/>
              <validation-messages :title="$t('freelancers.last_name')"
                                   :validation="$v.form.lastName"/>
            </b-input-group>
          </div>

          <input-group name="occupation"
                       class="mb-3"
                       v-model="form.occupation"
                       :placeholder="$t('freelancers.occupation')"
                       :label="$t('freelancers.occupation_label')"/>

          <input-group name="location"
                       class="mb-3"
                       v-model="form.location"
                       :placeholder="$t('freelancers.location')"
                       :label="$t('freelancers.location')"/>

          <b-form-checkbox v-model="form.travel"
                           class="mb-3"
                           name="travel">
            {{$t('freelancers.travel')}}
          </b-form-checkbox>

          <wysiwyg-textarea-group class="mb-4"
                                  v-model="form.bio"
                                  :label="$t('freelancers.about')"/>

          <h4 class="mb-3">{{$t('freelancers.web_presence')}}</h4>

          <input-group name="linkedIn"
                       class="mb-3"
                       v-model="form.linkedin"
                       placeholder="http://"
                       label="LinkedIn"/>

          <div class="form-row">
            <div class="col-md-6 mb-3">
              <input-group name="web"
                           v-model="form.web"
                           placeholder="http://"
                           label="Web"/>
            </div>
            <div class="col-md-6 mb-3">
              <input-group name="blog"
                           v-model="form.blog"
                           placeholder="http://"
                           :label="$t('freelancers.blog')"/>
            </div>
          </div>

          <h1 class="mb-5 mt-6">{{$t('freelancers.my_skills')}}</h1>

          <input-tags :label="$t('freelancers.roles_interested')"
                      class="mb-3"
                      v-model="form.categories"
                      :options="categories"
                      :placeholder="$t('freelancers.select_roles')"
                      options-label="name"
                      :validation="$v.form.categories"/>

          <input-tags :label="$t('freelancers.skills')"
                      class="mb-3"
                      v-model="form.skills"
                      :placeholder="$t('freelancers.select_skills')"
                      :options="skills"
                      options-label="name"
                      :validation="$v.form.skills"/>


          <div class="pt-5 d-flex flex-column flex-lg-row
        justify-content-center justify-content-lg-end
        align-items-center">
            <b-button type="submit" variant="primary" class="btn-round" :disabled="saving">
              <template v-if="!saving">{{buttonText}}</template>
              <template v-if="saving">{{$t('freelancers.saving')}}</template>
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </b-form>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';
import ImageUploader from '../form/ImageUploader.vue';
import InputField from '../form/InputField.vue';
import ValidationMessages from '../form/ValidationMessages.vue';
import InputGroup from '../form/InputGroup.vue';
import InputTags from '../form/InputTags.vue';
import WysiwygTextareaGroup from '../form/WysiwygTextareaGroup.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'UpdateBasicInfo',
  components: {
    WysiwygTextareaGroup,
    InputTags,
    InputGroup,
    ValidationMessages,
    InputField,
    ImageUploader,
  },
  props: {
    freelancer: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      form: {
        firstName: null,
        lastName: null,
        occupation: null,
        location: null,
        travel: false,
        bio: null,
        linkedin: null,
        web: null,
        blog: null,
        avatar: null,
        categories: [],
        skills: [],
      },
      saving: false,
      avatarOptions: {
        resize: {
          width: 240,
          height: 240,
        },
      },
    };
  },
  validations() {
    const v = { form: {} };

    if (!this.freelancer.published) {
      v.form.firstName = { required };
      v.form.lastName = { required };
    }

    v.form.avatar = { required };
    v.form.categories = { required, minLength: minLength(1) };
    v.form.skills = { required, minLength: minLength(1) };

    return v;
  },
  watch: {
    freelancer() {
      this.setupForm();
    },
    currentLanguage() {
      this.setupForm();
    },
  },
  created() {
    this.setupForm();
  },
  computed: {
    /**
     * Get all categories
     */
    categories() {
      return this.$store.getters['util/getCategories'];
    },

    /**
     * Return only skills for selected categories
     * @return {Array}
     */
    skills() {
      const selectedIds = this.form.categories ? this.form.categories.map(r => r.id) : [];
      return this.$store.getters['util/getSkillsByCategories'](selectedIds);
    },

    /**
     * Save button text
     */
    buttonText() {
      return this.freelancer.published
        ? this.$t('freelancers.save_profile')
        : this.$t('freelancers.save_publish');
    },

    /**
     * Get current language
     */
    currentLanguage() {
      return this.$store.getters['util/getCurrentLanguage'];
    },
  },
  methods: {
    /**
     * Add avatar to form
     * @param data
     */
    avatarAdded(data) {
      this.form.avatar = data;
    },

    /**
     * Remove avatar from form
     */
    avatarRemoved() {
      this.form.avatar = null;
    },

    setupForm() {
      if (this.freelancer && this.currentLanguage) {
        this.form = Object.assign({}, this.form, this.freelancer);

        this.form.categories = this.form.categories.map(c => ({
          id: c.id,
          name: c.translations
            .find(t => t.languageId === this.currentLanguage.id).displayTranslation,
        }));

        this.form.skills = this.form.skills.map(c => ({
          id: c.id,
          name: c.translations
            .find(t => t.languageId === this.currentLanguage.id).displayTranslation,
        }));
      }
    },

    /**
     * Save data
     * @return {Promise<void>}
     */
    async save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.saving = true;

        try {
          await this.$store.dispatch('user/updateFreelancerBasicInfo', {
            data: {
              ...this.form,
              published: true,
            },
            caller: 'update',
          });

          this.$store.commit('user/setProfileAvatar', {
            avatar: this.form.avatar,
            role: 'freelancer',
          });
          this.saving = false;
          this.$store.dispatch('ui/showNotification', {
            type: 'success',
            text: 'Profile saved',
          });
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
};
</script>
