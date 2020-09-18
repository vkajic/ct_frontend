<template>
  <div class="auth-form">
    <h1 class="mb-5 text-center text-lg-left">{{ $t('auth.reset_password.title') }}</h1>

    <b-form @submit.prevent="resetPassword">
      <b-form-group :description="$t('auth.reset_password.password_description')">
        <b-form-input
          v-model="form.newPassword"
          type="password"
          size="lg"
          :placeholder="$t('auth.reset_password.new')"
          :state="$v.form.newPassword.$dirty ? !$v.form.newPassword.$error : null"/>
        <password v-model="form.newPassword" :strength-meter-only="true"/>
        <validation-messages :title="$t('auth.reset_password.new')"
                             :validation="$v.form.newPassword"/>
      </b-form-group>

      <b-form-group>
        <b-form-input
          v-model="form.newPasswordConfirmation"
          type="password"
          size="lg"
          :placeholder="$t('auth.reset_password.new_again')"
          :state="$v.form.newPasswordConfirmation.$dirty
            ? !$v.form.newPasswordConfirmation.$error
            : null"/>
        <validation-messages :title="$t('auth.reset_password.new_again')"
                             :validation="$v.form.newPasswordConfirmation"/>
      </b-form-group>

      <b-button type="submit" variant="primary" size="lg" block :disabled="sending">
        {{ $t('auth.reset_password.button_label') }}
      </b-button>
    </b-form>
  </div>
</template>

<script>
import Password from 'vue-password-strength-meter';
import { required, minLength, sameAs } from 'vuelidate/lib/validators';
import ApiService from '../../services/api.service';
import languageRouter from '../mixins/languageRouter';
import passwordStrength from '../../validations/passwordStrength';
import ValidationMessages from '../form/ValidationMessages.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ResetPasswordForm',
  components: {
    Password,
    ValidationMessages,
  },
  mixins: [languageRouter],
  data() {
    return {
      form: {
        newPassword: null,
        newPasswordConfirmation: null,
      },
      sending: false,
    };
  },
  validations: {
    form: {
      newPassword: {
        required,
        minLength: minLength(8),
        passwordStrength,
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
            text: this.$t('auth.reset_password.success_notification'),
          });
          this.replace('/login');
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
