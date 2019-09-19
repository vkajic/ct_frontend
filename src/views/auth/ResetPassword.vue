<template>
  <auth-container>
    <reset-password-form/>
  </auth-container>
</template>

<script>
import ResetPasswordForm from '../../components/auth/ResetPasswordForm.vue';
import AuthContainer from '../../components/auth/AuthContainer.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ResetPassword',
  components: {
    AuthContainer,
    ResetPasswordForm,
  },
};
</script>
