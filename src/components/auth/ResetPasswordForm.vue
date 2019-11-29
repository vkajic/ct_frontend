<template>
  <div class="auth-form">
    <h1 class="mb-5 text-center text-lg-left">Reset Password.</h1>
    <b-alert variant="danger" :show="error" dismissible class="mb-2">
      {{error}}
    </b-alert>
    <b-form @submit.prevent="resetPassword">

      <b-form-group :description="passwordDescription">
        <b-form-input
          v-model="form.newPassword"
          type="password"
          size="lg"
          placeholder="New Password"
          :state="$v.form.newPassword.$dirty ? !$v.form.newPassword.$error : null"/>
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
      </b-form-group>

      <b-button type="submit" variant="primary" size="lg" block :disabled="sending">
        Set password
      </b-button>
    </b-form>
  </div>
</template>

<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators';
import ApiService from '../../services/api.service';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ResetPasswordForm',
  data() {
    return {
      form: {
        newPassword: null,
        newPasswordConfirmation: null,
      },
      sending: false,
      error: null,
      passwordDescription: `Make sure it's at least 15 characters OR at least
      8 characters including a number and a lowercase letter.`,
    };
  },
  validations: {
    form: {
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
    async resetPassword() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.sending = true;
        this.error = null;

        try {
          await ApiService.post('/auth/reset-password', {
            resetToken: this.$route.params.hash,
            password: this.form.newPassword,
          });
          this.form = {};
          this.$v.$reset();
          this.sending = false;
          this.$store.dispatch('ui/showNotification', {
            type: 'success',
            text: 'New password is set. You can now log in.',
          });
          this.$router.replace('/auth');
        } catch (err) {
          this.sending = false;
          this.error = err.response.data.message;
        }
      }
    },
  },
};
</script>
