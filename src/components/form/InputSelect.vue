<template>
  <b-form-select
    :id="name"
    :value="value"
    :placeholder="placeholder"
    :state="state"
    :options="options"
    @input="$emit('input', $event)"/>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'InputSelect',
  props: {
    name: {
      type: String,
      default: null,
    },
    value: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: null,
    },
    validation: {
      type: Object,
      default() {
        return {};
      },
    },
    options: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    state() {
      if (this.validation) {
        return this.validation.$dirty ? !this.validation.$error : null;
      }

      return null;
    },
  },
};
</script>
