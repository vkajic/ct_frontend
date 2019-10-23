<template>
  <div class="auth-form">
    <h1 class="mb-5">Login.</h1>
    <b-form @submit.prevent="login">
      <b-form-group>
        <b-form-input
          v-model="form.email"
          type="email"
          placeholder="Email"
          size="lg"
          :state="$v.form.email.$dirty ? !$v.form.email.$error : null"/>
        <validation-messages title="Email" :validation="$v.form.email"/>
      </b-form-group>

      <b-form-group>
        <b-form-input
          v-model="form.password"
          type="password"
          placeholder="Password"
          size="lg"
          :state="$v.form.password.$dirty ? !$v.form.password.$error : null"/>
        <validation-messages title="Password" :validation="$v.form.password"/>
      </b-form-group>

      <b-button type="submit"
                variant="primary"
                size="lg"
                block
                class="mb-3"
                :disabled="sending">Login to CryptoTask
      </b-button>

      <div class="text-center">
        <router-link to="/forgot-password">Forgot password?</router-link>
      </div>
    </b-form>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import ValidationMessages from '../form/ValidationMessages.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'LoginForm',
  components: { ValidationMessages },
  data() {
    return {
      form: {
        email: null,
        password: null,
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
      password: {
        required,
      },
    },
  },
  methods: {
    async login() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.sending = true;

        try {
          await this.$store.dispatch('user/login', this.form);
          this.form = {};
          this.$v.$reset();
          this.sending = false;
        } catch (err) {
          this.sending = false;
          this.$store.dispatch('ui/showNotification', {
            type: 'danger',
            text: `Something went wrong. ${err.response.data.message}`,
          });
        }
      }
    },
  },
};
</script>
