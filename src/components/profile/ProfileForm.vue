<template>
  <b-form @submit.prevent="save">
    <b-form-group
      id="name-group"
      label="Name"
      label-for="name">
      <b-form-input
        id="name"
        v-model="form.name"
        type="text"
        placeholder="Enter your name"
        :state="$v.form.name.$dirty ? !$v.form.name.$error : null"/>
    </b-form-group>

    <b-form-group
      id="bio-group"
      label="Bio"
      label-for="bio">
      <b-form-textarea
        id="bio"
        v-model="form.bio"
        rows="3"
        max-rows="6"/>
    </b-form-group>

    <b-form-group
      id="skills-group"
      label="Skills"
      label-for="skills">
      <v-select :options="skills" v-model="form.Skills" label="name" :multiple="true"/>
    </b-form-group>

    <b-form-group
      id="languages-group"
      label="Languages"
      label-for="languages">
      <v-select :options="languages" v-model="form.Languages" label="name" :multiple="true"/>
    </b-form-group>

    <b-button type="submit" variant="primary">Save</b-button>
  </b-form>
</template>

<script>
import vSelect from 'vue-select';
import { mapState } from 'vuex';
import { required } from 'vuelidate/lib/validators';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ProfileForm',
  components: {
    vSelect,
  },
  props: {
    profile: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  validations: {
    form: {
      name: {
        required,
      },
    },
  },
  data() {
    return {
      form: {
        name: '',
        bio: '',
        Skills: [],
        Languages: [],
      },
    };
  },
  created() {
    this.$store.dispatch('util/getSkills');
    this.$store.dispatch('util/getLanguages');
    this.form = Object.assign({}, this.form, this.profile);
  },
  computed: {
    ...mapState('util', {
      skills: state => state.skills,
      languages: state => state.languages,
    }),
  },
  methods: {
    save() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.$emit('save', this.form);
      }
    },
  },
  watch: {
    profile(v) {
      this.form = Object.assign({}, this.form, v);
    },
  },
};
</script>
