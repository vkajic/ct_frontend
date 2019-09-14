<template>
  <div>
    <label v-if="label">{{label}}</label>
    <input-field :name="name"
                 :value="value"
                 :placeholder="placeholder"
                 :validation="validation"
                 @input="$emit('input', $event)"/>
    <validation-messages v-if="validation" :title="placeholder" :validation="validation"/>
  </div>
</template>

<script>
import InputField from './InputField.vue';
import ValidationMessages from './ValidationMessages.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'InputGroup',
  components: {
    ValidationMessages,
    InputField,
  },
  props: {
    label: {
      type: String,
      default: null,
    },
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
      default: null,
    },
  },
};
</script>
