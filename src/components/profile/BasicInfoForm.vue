<template>
  <b-form @submit.prevent="save">
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
        <h1 class="d-none d-lg-block mb-5">{{$t('freelancers.basic_info')}}</h1>
        <div class="mb-3">
          <label>{{ $t('freelancers.name') }}</label>
          <b-input-group>
            <input-field name="firstName"
                         v-model="form.firstName"
                         :placeholder="$t('freelancers.first_name')"
                         :validation="$v.form.firstName"/>
            <input-field name="lastName"
                         v-model="form.lastName"
                         :placeholder="$t('freelancers.last_name')"
                         :validation="$v.form.lastName"/>
            <validation-messages title="First Name" :validation="$v.form.firstName"/>
            <validation-messages title="Last Name" :validation="$v.form.lastName"/>
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
                         name="travel">{{ $t('freelancers.travel') }}</b-form-checkbox>

        <textarea-group name="bio"
                        class="mb-4"
                        v-model="form.bio"
                        :label="$t('freelancers.about')"/>

        <h4 class="mb-3">{{ $t('freelancers.web_presence') }}</h4>

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

        <funnel-buttons :submit-text="$t('freelancers.next_skills')"
                        :saving="saving"/>
      </div>
    </div>
  </b-form>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import InputField from '../form/InputField.vue';
import ValidationMessages from '../form/ValidationMessages.vue';
import InputGroup from '../form/InputGroup.vue';
import TextareaGroup from '../form/TextareaGroup.vue';
import ImageUploader from '../form/ImageUploader.vue';
import FunnelButtons from './FunnelButtons.vue';

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
    FunnelButtons,
    ImageUploader,
    TextareaGroup,
    InputGroup,
    ValidationMessages,
    InputField,
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
      avatarOptions: {
        resize: {
          width: 240,
          height: 240,
        },
      },
    };
  },
  methods: {
    async save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.saving = true;

        try {
          await this.$store.dispatch('user/updateFreelancerBasicInfo', {
            data: this.form,
            caller: 'create',
          });

          this.$store.commit('user/setProfileAvatar', {
            avatar: this.form.avatar,
            role: 'freelancer',
          });
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
