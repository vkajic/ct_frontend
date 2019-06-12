<template>
  <b-card title="Register">
    <b-alert variant="danger" :show="registrationError" dismissible class="mb-2">
      {{registrationError}}
    </b-alert>
    <b-alert variant="success" :show="registrationSuccess" dismissible class="mb-2">
      {{registrationSuccess}}
    </b-alert>
    <b-form @submit.prevent="register">
      <b-form-group label="Your name:">
        <b-form-input
          v-model="form.name"
          type="text"
          placeholder="Enter your name"
          :state="$v.form.name.$dirty ? !$v.form.name.$error : null"/>
      </b-form-group>

      <b-form-group label="Email address:">
        <b-form-input
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          :state="$v.form.email.$dirty ? !$v.form.email.$error : null"/>
      </b-form-group>

      <b-form-group label="Password:">
        <b-form-input
          v-model="form.password"
          type="password"
          placeholder="Enter password"
          :state="$v.form.password.$dirty ? !$v.form.password.$error : null"/>
      </b-form-group>

      <b-button type="submit" variant="primary">Register</b-button>
    </b-form>
  </b-card>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'RegisterForm',
  data() {
    return {
      form: {
        email: null,
        password: null,
        name: null,
      },
      sending: false,
      registrationError: null,
      registrationSuccess: null,
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
        minLength: minLength(6),
      },
      name: {
        required,
      },
    },
  },
  methods: {
    async register() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.sending = true;
        this.registrationError = null;

        try {
          await this.$store.dispatch('user/register', this.form);
          this.form = {};
          this.$v.$reset();
          this.sending = false;
          this.registrationSuccess = 'You are registered. Please check your email for confirmation';
        } catch (err) {
          this.sending = false;
          this.registrationError = err.response.data.message;
        }
      }
    },
  },
};
</script>
