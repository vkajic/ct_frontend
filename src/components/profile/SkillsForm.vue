<template>
  <div>
    <h1 class="mb-5">My skills & services</h1>

    <b-form @submit.prevent="save">
      <input-tags label="Roles I'm interested in"
                  class="mb-3"
                  v-model="form.roles"
                  placeholder="Select roles"
                  :validation="$v.form.roles"/>

      <input-tags label="Skills"
                  class="mb-3"
                  v-model="form.skills"
                  placeholder="Select skills"
                  :validation="$v.form.skills"/>

      <div class="pt-5 d-flex justify-content-end align-items-center">
        <router-link to="/create-freelancer/experience" class="mr-3">Skip for now</router-link>
        <b-button type="submit" variant="primary" class="btn-round">
          Next: Work experience
        </b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import { required } from 'vuelidate/src/validators';
import InputTags from '../form/InputTags.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'SkillsForm',
  components: { InputTags },
  validations: {
    form: {
      roles: {
        required,
      },
      skills: {
        required,
      },
    },
  },
  data() {
    return {
      form: {
        roles: [],
        skills: [],
      },
    };
  },
};
</script>
