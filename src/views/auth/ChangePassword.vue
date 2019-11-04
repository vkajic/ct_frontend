<template>
  <page-wrapper :menu-width="3">
    <div class="paper px-7 py-6">
      <h1 class="mb-5">Change Password.</h1>

      <b-form @submit.prevent="changePassword">
        <b-form-group>
          <b-form-input
            v-model="form.oldPassword"
            type="password"
            size="lg"
            placeholder="Old Password"
            :state="$v.form.oldPassword.$dirty ? !$v.form.oldPassword.$error : null"/>
          <validation-messages title="Old password" :validation="$v.form.oldPassword"/>
        </b-form-group>

        <b-form-group>
          <b-form-input
            v-model="form.newPassword"
            type="password"
            size="lg"
            placeholder="New Password"
            :state="$v.form.newPassword.$dirty ? !$v.form.newPassword.$error : null"/>
          <validation-messages title="New password" :validation="$v.form.newPassword"/>
        </b-form-group>

        <b-form-group>
          <b-form-input
            v-model="form.newPasswordConfirmation"
            type="password"
            size="lg"
            placeholder="New Password Again"
            :state="$v.form.newPasswordConfirmation.$dirty
            ? !$v.form.newPasswordConfirmation.$error
            : null"/>
          <validation-messages title="New password confirmation"
                               :validation="$v.form.newPasswordConfirmation"/>
        </b-form-group>

        <b-button type="submit" variant="primary" size="lg" block v-if="!sending">
          Update password
        </b-button>
        <b-button type="submit" variant="primary" size="lg" block :disabled="true" v-if="sending">
          Updating password...
        </b-button>
      </b-form>
    </div>
  </page-wrapper>
</template>

<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators';
import PageWrapper from '../../components/ui/PageWrapper.vue';
import ApiService from '../../services/api.service';
import ValidationMessages from '../../components/form/ValidationMessages.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ChangePassword',
  components: { ValidationMessages, PageWrapper },
  data() {
    return {
      form: {
        oldPassword: null,
        newPassword: null,
        newPasswordConfirmation: null,
      },
      sending: false,
      error: null,
    };
  },
  validations: {
    form: {
      oldPassword: {
        required,
        minLength: minLength(8),
      },
      newPassword: {
        required,
        minLength: minLength(8),
      },
      newPasswordConfirmation: {
        required,
        minLength: minLength(8),
        sameAsPassword: sameAs('newPassword'),
      },
    },
  },
  methods: {
    async changePassword() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.sending = true;
        this.error = null;

        try {
          await ApiService.put('/users/password', this.form);
          this.$v.$reset();
          this.sending = false;
          this.$store.dispatch('ui/showNotification', {
            type: 'success',
            text: 'New password is saved.',
          });
        } catch (err) {
          this.$store.dispatch('ui/showNotification', {
            type: 'danger',
            text: err.response.data.message,
          });

          this.sending = false;
          this.error = err.response.data.message;
        }
      }
    },
  },
};
</script>
