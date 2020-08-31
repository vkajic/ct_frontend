<template>
  <b-form-invalid-feedback :class="{'d-block': visible}">
    <div v-if="errorVisible('required')">
      {{title}} is required
    </div>
    <div v-if="errorVisible('integer')">
      {{title}} must be number
    </div>
    <div v-if="errorVisible('numeric')">
      {{title}} must be number
    </div>
    <div v-if="errorVisible('decimal')">
      {{title}} must be number
    </div>
    <div v-if="errorVisible('minValue')">
      {{title}} must be at least {{validation.$params.minValue.min}}
    </div>
    <div v-if="errorVisible('minLength')">
      {{title}} must have at least {{validation.$params.minLength.min}} value
    </div>
    <div v-if="errorVisible('maxLength')">
      {{title}} can't have more then {{validation.$params.maxLength.max}} characters
    </div>
    <div v-if="errorVisible('minLength')">
      {{title}} must have at least {{validation.$params.minLength.max}} values
    </div>
    <div v-if="errorVisible('passwordStrength')">
      {{title}} too weak
    </div>
  </b-form-invalid-feedback>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ValidationMessages',
  props: {
    title: {
      type: String,
      required: true,
    },
    validation: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    errorVisible(type) {
      return this.messages.indexOf(type) > -1;
    },
  },
  computed: {
    visible() {
      return this.validation && this.validation.$dirty && this.validation.$error;
    },

    messages() {
      const errors = [];

      if (this.validation.$params) {
        Object.keys(this.validation.$params)
          .forEach((p) => {
            if (!this.validation[p]) {
              errors.push(p);
            }
          });
      }

      return errors;
    },
  },
};
</script>
