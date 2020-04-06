<template>
  <b-form @submit.prevent="save">
    <div class="row">
      <div class="col-12 col-lg-4 d-flex justify-content-center">
        <image-uploader label="Add profile image"
                        title="Profile image"
                        class="image-uploader-basic mb-5"
                        @input="avatarAdded"
                        :value="form.avatar"
                        type="public"
                        @remove="avatarRemoved"
                        :options="avatarOptions"/>
      </div>
      <div class="col-12 col-lg-8">
        <h1 class="d-none d-lg-block mb-5">Basic Info</h1>
        <input-group name="name"
                     class="mb-3"
                     v-model="form.name"
                     placeholder="Your/Company name"
                     label="Name"
                     :validation="$v.form.name"/>

        <input-group name="location"
                     class="mb-3"
                     v-model="form.location"
                     placeholder="Location"
                     label="Location"/>

        <wysiwyg-textarea-group class="mb-4"
                                v-model="form.about"
                                label="About me"/>

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
  </b-form>
</template>

<script>
import { required } from 'vuelidate/src/validators';
import ImageUploader from '../form/ImageUploader.vue';
import InputGroup from '../form/InputGroup.vue';
import WysiwygTextareaGroup from '../form/WysiwygTextareaGroup.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ClientBasicInfoForm',
  components: {
    WysiwygTextareaGroup,
    InputGroup,
    ImageUploader,
  },
  props: {
    client: {
      type: Object,
      default() {
        return {};
      },
    },
    redirectAfterSave: {
      type: Boolean,
      default: false,
    },
  },
  validations: {
    form: {
      name: {
        required,
      },
    },
  },
  data() {
    return {
      form: {
        name: null,
        location: null,
        about: null,
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
          await this.$store.dispatch('user/updateClientBasicInfo', this.form);

          this.$store.commit('user/setProfileAvatar', {
            avatar: this.form.avatar,
            role: 'client',
          });

          this.saving = false;
          this.$store.dispatch('ui/showNotification', {
            type: 'success',
            text: 'Your profile is saved',
          });
          if (this.redirectAfterSave) {
            this.$router.replace('/freelancers');
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

    avatarAdded(data) {
      this.form.avatar = data;
    },

    avatarRemoved() {
      this.form.avatar = null;
    },
  },
  watch: {
    client(n) {
      if (n && n.id) {
        this.form = Object.assign({}, this.form, n);
      }
    },
  },
  created() {
    if (this.client) {
      this.form = Object.assign({}, this.form, this.client);
    }
  },
};
</script>
