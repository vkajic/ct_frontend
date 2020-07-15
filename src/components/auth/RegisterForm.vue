<template>
  <div class="auth-form">
    <h1 class="h1-sm mb-5 text-center text-lg-left">{{$t('auth.sign_up.title')}}</h1>

    <b-form @submit.prevent="register">
      <b-form-group>
        <b-form-input
          v-model="form.email"
          type="email"
          size="lg"
          :placeholder="$t('auth.sign_up.email')"
          :state="$v.form.email.$dirty ? !$v.form.email.$error : null"/>
      </b-form-group>

      <b-form-group>
        <template slot="description">
          <div class="font-12-sm">{{$t('auth.sign_up.password_description')}}</div>
        </template>

        <b-form-input
          v-model="form.password"
          type="password"
          size="lg"
          :placeholder="$t('auth.sign_up.password')"
          :state="$v.form.password.$dirty ? !$v.form.password.$error : null"/>
        <password v-model="form.password" :strength-meter-only="true"/>
        <validation-messages :title="$t('auth.sign_up.password')" :validation="$v.form.password"/>
      </b-form-group>

      <b-form-group>
        <b-form-input
          v-model="form.passwordConfirmation"
          type="password"
          size="lg"
          :placeholder="$t('auth.sign_up.password_confirmation')"
          :state="$v.form.passwordConfirmation.$dirty
          ? !$v.form.passwordConfirmation.$error : null"/>
      </b-form-group>

      <b-button type="submit" size="lg" block variant="primary" class="mb-3" :disabled="sending">
        <template v-if="!sending">{{$t('auth.sign_up.button_label')}}</template>
        <template v-if="sending">{{$t('auth.sign_up.button_loading')}}</template>
      </b-button>

      <p class="text-muted">
        <small class="font-12-sm">
          {{$t('auth.sign_up.terms_label')}}
        </small>
      </p>
    </b-form>
  </div>
</template>

<script>
import {
  required, email, sameAs,
} from 'vuelidate/lib/validators';
import Password from 'vue-password-strength-meter';
import passwordStrength from '../../validations/passwordStrength';
import ValidationMessages from '../form/ValidationMessages.vue';

const initialForm = {
  email: '',
  password: '',
  passwordConfirmation: '',
  role: null,
};

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'RegisterForm',
  components: {
    ValidationMessages,
    Password,
  },
  data() {
    return {
      form: Object.assign({}, initialForm),
      sending: false,
    };
  },
  validations: {
    form: {
      email: {
        required,
        email,
      },
      password: {
        required,
        // minLength: minLength(8),
        passwordStrength,
      },
      passwordConfirmation: {
        required,
        // minLength: minLength(8),
        sameAsPassword: sameAs('password'),
      },
    },
  },
  methods: {
    /**
     * Register
     * @return {Promise<void>}
     */
    async register() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.sending = true;

        try {
          this.form.role = this.registrationRole;

          const { referrer } = this.$route.query;
          if (referrer) {
            this.form.referrer = referrer;
          }

          await this.$store.dispatch('user/register', this.form);
          this.form = initialForm;
          this.$v.$reset();
          this.sending = false;
          this.$store.dispatch('ui/showNotification', {
            type: 'success',
            text: this.$t('auth.sign_up.success_notification'),
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
  computed: {
    registrationRole() {
      return this.$store.state.user.registrationRole;
    },
  },
};
</script>
