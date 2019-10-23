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

        <textarea-group name="about"
                        class="mb-4"
                        v-model="form.about"
                        label="About me"/>

        <div class="pt-5 d-flex justify-content-end align-items-center">
          <b-button type="submit" variant="primary" class="btn-round" :disabled="saving">
            <template v-if="!saving">Save profile</template>
            <template v-if="saving">Saving...</template>
          </b-button>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/src/validators';
import ImageUploader from '../form/ImageUploader.vue';
import InputGroup from '../form/InputGroup.vue';
import TextareaGroup from '../form/TextareaGroup.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ClientBasicInfoForm',
  components: {
    TextareaGroup,
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
    };
  },
  methods: {
    async save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.saving = true;

        try {
          if (this.client && this.client.id) {
            await this.$store.dispatch('user/updateClientBasicInfo', this.form);
          } else {
            await this.$store.dispatch('user/createClientBasicInfo', this.form);
          }
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
