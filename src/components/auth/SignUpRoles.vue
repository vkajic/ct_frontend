<template>
  <div class="auth-form">
    <h1 class="mb-5 text-center text-lg-left">Sign Up.</h1>

    <div class="roles-chooser d-flex align-items-stretch h-100">
      <a href="#"
         class="role h-100 w-50 d-flex align-items-center py-5 justify-content-center"
         @click.prevent="$emit('select', 'freelancer')">
        <coffee-icon size="3x" class="mr-3"/>
        <span>I'm a<br/>Freelancer</span>
      </a>
      <hr class="m-0 mx-3 w-1 h-auto border-right" />
      <a href="#"
         class="role h-100 d-flex align-items-center flex-grow-1 py-5 justify-content-center"
         @click.prevent="$emit('select', 'client')">
        <briefcase-icon size="3x" class="mr-3"/>
        <span>I'm a<br/>Client</span>
      </a>
    </div>
  </div>
</template>

<script>
import { CoffeeIcon, BriefcaseIcon } from 'vue-feather-icons';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'SignUpRoles',
  components: {
    CoffeeIcon,
    BriefcaseIcon,
  },
};
</script>
