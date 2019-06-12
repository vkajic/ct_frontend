<template>
  <div class="auth">
    <div class="row">
      <div class="col-md-6">
        <login-form/>
      </div>
      <div class="col-md-6">
        <register-form/>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '../components/auth/LoginForm.vue';
import RegisterForm from '../components/auth/RegisterForm.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Auth',
  components: {
    RegisterForm,
    LoginForm,
  },
};
</script>
