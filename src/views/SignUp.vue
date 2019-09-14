<template>
  <auth-container>
    <register-form/>
  </auth-container>
</template>

<script>
import RegisterForm from '../components/auth/RegisterForm.vue';
import AuthContainer from '../components/auth/AuthContainer.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'SignUp',
  components: {
    AuthContainer,
    RegisterForm,
  },
};
</script>
