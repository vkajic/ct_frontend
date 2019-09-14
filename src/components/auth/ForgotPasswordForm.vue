<template>
  <div class="auth-form">
    <h1 class="mb-5">Forgot Password.</h1>

    <b-alert variant="danger" :show="error" dismissible class="mb-2">
      {{error}}
    </b-alert>
    <b-alert variant="success" :show="success" dismissible class="mb-2">
      {{success}}
    </b-alert>
    <b-form @submit.prevent="sendToken">
      <b-form-group>
        <b-form-input
          v-model="form.email"
          type="email"
          size="lg"
          placeholder="Email"
          :state="$v.form.email.$dirty ? !$v.form.email.$error : null"/>
      </b-form-group>

      <b-button type="submit" size="lg" block variant="primary" :disabled="sending">
        Send token
      </b-button>
    </b-form>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import AuthService from '../../services/auth.service';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ForgotPasswordForm',
  data() {
    return {
      form: {
        email: null,
      },
      sending: false,
      error: null,
      success: null,
    };
  },
  validations: {
    form: {
      email: {
        required,
        email,
      },
    },
  },
  methods: {
    async sendToken() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.sending = true;
        this.error = null;
        this.success = null;

        try {
          await AuthService.forgotPassword(this.form.email);
          this.form = {};
          this.$v.$reset();
          this.sending = false;
          this.success = 'Password reset token is sent to your email address. Please follow instructions from email.';
        } catch (err) {
          this.sending = false;
          this.error = err.response.data.message;
          this.success = null;
        }
      }
    },
  },
};
</script>
