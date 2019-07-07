<template>
  <b-form @submit.prevent="save">
    <b-form-group
      id="oldPassword-group"
      label="Old password"
      label-for="oldPassword">
      <b-form-input
        id="oldPassword"
        v-model="form.oldPassword"
        type="password"
        placeholder="Enter your old password"
        :state="$v.form.oldPassword.$dirty ? !$v.form.oldPassword.$error : null"/>
    </b-form-group>

    <b-form-group
      id="newPassword-group"
      label="New password"
      label-for="newPassword">
      <b-form-input
        id="newPassword"
        v-model="form.newPassword"
        type="password"
        placeholder="Enter new password"
        :state="$v.form.newPassword.$dirty ? !$v.form.newPassword.$error : null"/>
    </b-form-group>

    <b-form-group
      id="newPasswordConfirmation-group"
      label="New password confirmation"
      label-for="newPasswordConfirmation">
      <b-form-input
        id="newPasswordConfirmation"
        v-model="form.newPasswordConfirmation"
        type="password"
        placeholder="Confirm new password"
        :state="$v.form.newPasswordConfirmation.$dirty
              ? !$v.form.newPasswordConfirmation.$error
              : null"/>
    </b-form-group>

    <b-button type="submit" variant="primary">Change</b-button>
  </b-form>
</template>

<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ProfilePasswordForm',
  data() {
    return {
      form: {
        oldPassword: '',
        newPassword: '',
        newPasswordConfirmation: '',
      },
    };
  },
  validations: {
    form: {
      oldPassword: {
        required,
        minLength: minLength(8),
      },
      newPassword: {
        required,
        minLength: minLength(8),
      },
      newPasswordConfirmation: {
        required,
        minLength: minLength(8),
        sameAs: sameAs('newPassword'),
      },
    },
  },
  methods: {
    save() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.$emit('save', this.form);
      }
    },
  },
};
</script>
