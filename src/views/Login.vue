<template>
  <auth-container>
    <login-form/>
  </auth-container>
</template>

<script>
import LoginForm from '../components/auth/LoginForm.vue';
import AuthContainer from '../components/auth/AuthContainer.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Login',
  components: {
    AuthContainer,
    LoginForm,
  },
};
</script>
