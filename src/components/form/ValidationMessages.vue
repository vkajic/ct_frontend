<template>
  <b-form-invalid-feedback :class="{'d-block': visible}">
    <template v-if="errorVisible('required')">
      {{title}} is required
    </template>
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
      if (this.validation) {
        return this.validation.$dirty ? !this.validation.$error : false;
      }

      return false;
    },

    messages() {
      const errors = [];

      Object.keys(this.validation.$params)
        .forEach((p) => {
          if (!this.validation[p]) {
            errors.push(p);
          }
        });

      return errors;
    },
  },
};
</script>
