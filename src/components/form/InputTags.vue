<template>
  <div>
    <label v-if="label">{{label}}</label>
    <v-select :options="options"
              :class="[classes]"
              :value="value"
              :multiple="true"
              :placeholder="placeholder"
              :label="optionsLabel"
              @input="$emit('input', $event)"/>
    <validation-messages v-if="validation"
                         :title="placeholder"
                         :validation="validation"/>
  </div>
</template>

<script>
import vSelect from 'vue-select';
import ValidationMessages from './ValidationMessages.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'InputTags',
  components: {
    ValidationMessages,
    vSelect,
  },
  props: {
    label: {
      type: String,
      default: null,
    },
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    optionsLabel: {
      type: String,
      default: 'label',
    },
    value: {
      type: Array,
      default() {
        return [];
      },
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
  computed: {
    classes() {
      return this.validation && this.validation.$dirty && this.validation.$invalid
        ? 'is-invalid'
        : '';
    },
  },
};
</script>
