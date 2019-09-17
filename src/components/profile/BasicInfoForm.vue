<template>
  <div class="row">
    <div class="col-4">
      <image-uploader label="Add profile image"
                      @input="avatarAdded"
                      :value="form.avatar"
                      type="public"
                      @remove="avatarRemoved"/>
    </div>
    <div class="col-8">

      <h1 class="mb-5">Basic Info</h1>

      <b-form @submit.prevent="save">
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

        <div class="pt-5 d-flex justify-content-end align-items-center">
          <router-link to="/create-freelancer/skills" class="mr-3">Skip for now</router-link>
          <b-button type="submit" variant="primary" class="btn-round" :disabled="saving">
            <template v-if="!saving">Next: Set skills & services</template>
            <template v-if="saving">Saving...</template>
          </b-button>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import InputField from '../form/InputField.vue';
import ValidationMessages from '../form/ValidationMessages.vue';
import InputGroup from '../form/InputGroup.vue';
import TextareaGroup from '../form/TextareaGroup.vue';
import ImageUploader from '../form/ImageUploader.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'BasicInfoForm',
  props: {
    freelancer: {
      type: Object,
      default: null,
    },
  },
  components: {
    ImageUploader,
    TextareaGroup,
    InputGroup,
    ValidationMessages,
    InputField,
  },
  validations: {
    form: {
      firstName: {
        required,
      },
      lastName: {
        required,
      },
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
      },
      saving: false,
    };
  },
  methods: {
    async save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.saving = true;

        try {
          if (this.freelancer.id) {
            await this.$store.dispatch('user/updateFreelancerBasicInfo', this.form);
          } else {
            await this.$store.dispatch('user/createFreelancerBasicInfo', this.form);
          }
          this.saving = false;
          this.$router.push('/create-freelancer/skills');
        } catch (err) {
          this.$store.dispatch('ui/showNotification', {
            type: 'danger',
            text: err.message,
          });
          this.saving = false;
        }
      }
    },

    avatarAdded(data) {
      this.form.avatar = data;
    },

    avatarRemoved() {
      this.form.avatar = null;
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
};
</script>
