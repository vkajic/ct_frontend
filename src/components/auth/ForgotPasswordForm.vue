<template>
  <div class="auth-form">
    <h1 class="mb-5 text-center text-lg-left">{{$t('auth.forgot_password.title')}}</h1>

    <b-form @submit.prevent="sendToken">
      <b-form-group>
        <b-form-input
          v-model="form.email"
          type="email"
          size="lg"
          :placeholder="$t('auth.forgot_password.email')"
          :state="$v.form.email.$dirty ? !$v.form.email.$error : null"/>
      </b-form-group>

      <b-button type="submit" size="lg" block variant="primary" :disabled="sending">
        {{$t('auth.forgot_password.button_label')}}
      </b-button>
    </b-form>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import ApiService from '../../services/api.service';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ForgotPasswordForm',
  data() {
    return {
      form: {
        email: null,
      },
      sending: false,
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

        try {
          await ApiService.post('/auth/forgot-password', { email: this.form.email });
          this.form = {};
          this.$v.$reset();
          this.sending = false;
          this.$store.dispatch('ui/showNotification', {
            type: 'success',
            text: this.$t('auth.forgot_password.success_notification'),
          });
        } catch (err) {
          this.sending = false;
          this.$store.dispatch('ui/showNotification', {
            type: 'danger',
            text: err.response.data.message,
          });
        }
      }
    },
  },
};
</script>
