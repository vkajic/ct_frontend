<template>
  <auth-container>
    <forgot-password-form/>
  </auth-container>
</template>

<script>
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm.vue';
import AuthContainer from '../../components/auth/AuthContainer.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ForgotPassword',
  components: {
    AuthContainer,
    ForgotPasswordForm,
  },
};
</script>
