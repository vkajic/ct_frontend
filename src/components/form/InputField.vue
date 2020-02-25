<template>
  <b-form-input
    :id="name"
    :value="value"
    :type="type"
    :placeholder="placeholder"
    :state="state"
    :disabled="disabled"
    @input="$emit('input', $event)"/>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'InputField',
  props: {
    name: {
      type: String,
      default: null,
    },
    value: {
      type: [String, Number],
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
    disabled: {
      type: Boolean,
      default: false,
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
