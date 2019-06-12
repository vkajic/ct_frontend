<template>
  <b-card title="Login">
    <b-alert variant="danger" :show="loginError" dismissible class="mb-2">
      {{loginError}}
    </b-alert>
    <b-form @submit.prevent="login">
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

      <b-button type="submit" variant="primary" :disabled="sending">Login</b-button>
    </b-form>
  </b-card>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'LoginForm',
  data() {
    return {
      form: {
        email: null,
        password: null,
      },
      sending: false,
      loginError: null,
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
        this.loginError = null;

        try {
          await this.$store.dispatch('user/login', this.form);
          this.form = {};
          this.$v.$reset();
          this.sending = false;
          this.$router.replace('/');
        } catch (err) {
          this.sending = false;
          this.loginError = err.response.data.message;
        }
      }
    },
  },
};
</script>
