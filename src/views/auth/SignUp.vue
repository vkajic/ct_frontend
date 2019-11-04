<template>
  <auth-container>
    <sign-up-roles @select="selectRole" v-if="!registrationRole"/>
    <register-form v-if="registrationRole"/>
  </auth-container>
</template>

<script>
import RegisterForm from '../../components/auth/RegisterForm.vue';
import AuthContainer from '../../components/auth/AuthContainer.vue';
import SignUpRoles from './SignUpRoles.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'SignUp',
  data() {
    return {
      role: null,
    };
  },
  components: {
    SignUpRoles,
    AuthContainer,
    RegisterForm,
  },
  computed: {
    registrationRole() {
      return this.$store.state.user.registrationRole;
    },
  },
  methods: {
    selectRole(role) {
      this.$store.commit('user/selectRole', role);
    },
  },
};
</script>
