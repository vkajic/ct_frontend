<template>
  <b-form @submit.prevent="save">
    <div>
      <div class="row">
        <div class="col-12 col-lg-4 d-flex justify-content-center">
          <image-uploader label="Add profile image"
                          class="mb-5"
                          title="Profile image"
                          @input="avatarAdded"
                          :value="form.avatar"
                          type="public"
                          @remove="avatarRemoved"/>
          <validation-messages title="Profile image" :validation="$v.form.avatar"/>
        </div>
        <div class="col-12 col-lg-8">

          <h1 class="mb-5 d-none d-lg-block">Basic Info</h1>

          <div class="mb-3">
            <label>Name</label>
            <b-input-group>
              <input-field name="firstName"
                           v-model="form.firstName"
                           placeholder="First Name"
                           :validation="$v.form.firstName"/>
              <input-field name="lastName"
                           v-model="form.lastName"
                           placeholder="Last Name"
                           :validation="$v.form.lastName"/>
              <validation-messages title="First Name" :validation="$v.form.firstName"/>
              <validation-messages title="Last Name" :validation="$v.form.lastName"/>
            </b-input-group>
          </div>

          <input-group name="occupation"
                       class="mb-3"
                       v-model="form.occupation"
                       placeholder="Occupation"
                       label="What’s your occupation"/>

          <input-group name="location"
                       class="mb-3"
                       v-model="form.location"
                       placeholder="Location"
                       label="Location"/>

          <b-form-checkbox v-model="form.travel"
                           class="mb-3"
                           name="travel">
            Open to travel for the right opportunity
          </b-form-checkbox>

          <textarea-group name="bio"
                          class="mb-4"
                          v-model="form.bio"
                          label="About me"/>

          <h4 class="mb-3">Web presence</h4>

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
                           label="Blog"/>
            </div>
          </div>

          <h1 class="mb-5 mt-6">My skills & services</h1>

          <input-tags label="Roles I'm interested in"
                      class="mb-3"
                      v-model="form.categories"
                      :options="categories"
                      placeholder="Select roles"
                      options-label="name"
                      :validation="$v.form.categories"/>

          <input-tags label="Skills"
                      class="mb-3"
                      v-model="form.skills"
                      placeholder="Select skills"
                      :options="skills"
                      options-label="name"
                      :validation="$v.form.skills"/>


          <div class="pt-5 d-flex flex-column flex-lg-row
        justify-content-center justify-content-lg-end
        align-items-center">
            <b-button type="submit" variant="primary" class="btn-round" :disabled="saving">
              <template v-if="!saving">Save profile</template>
              <template v-if="saving">Saving...</template>
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
import TextareaGroup from '../form/TextareaGroup.vue';
import InputTags from '../form/InputTags.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'UpdateBasicInfo',
  components: {
    InputTags,
    TextareaGroup,
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
    };
  },
  validations: {
    form: {
      avatar: {
        required,
      },
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      categories: {
        required,
        minLength: minLength(1),
      },
      skills: {
        required,
        minLength: minLength(1),
      },
    },
  },
  watch: {
    freelancer(n) {
      if (n && n.id) {
        this.form = Object.assign({}, this.form, n);
      }
    },
  },
  created() {
    if (this.freelancer) {
      this.form = Object.assign({}, this.form, this.freelancer);
    }
  },
  computed: {
    /**
     * Get all categories
     */
    categories() {
      return this.$store.state.util.skills;
    },

    /**
     * Return only skills for selected categories
     * @return {Array}
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

    /**
     * Save data
     * @return {Promise<void>}
     */
    async save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.saving = true;

        try {
          await this.$store.dispatch('user/updateFreelancerBasicInfo', this.form);

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
