<template>
  <div>
    <label v-if="label">{{label}}</label>
    <b-form-textarea
      :id="name"
      :value="value"
      :placeholder="placeholder"
      :rows="rows"
      :max-rows="maxRows"
      :state="state"
      @input="$emit('input', $event)"/>
    <validation-messages v-if="validation" :title="placeholder" :validation="validation"/>
  </div>
</template>

<script>
import ValidationMessages from './ValidationMessages.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'TextareaGroup',
  components: {
    ValidationMessages,
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
    placeholder: {
      type: String,
      default: null,
    },
    validation: {
      type: Object,
      default: null,
    },
    rows: {
      type: Number,
      default: 3,
    },
    maxRows: {
      type: Number,
      default: 6,
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
