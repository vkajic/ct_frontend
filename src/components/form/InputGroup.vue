<template>
  <div>
    <label v-if="label">{{label}}</label>
    <div class="input-group">
      <div class="input-group-prepend" v-if="hasPrependSlot">
        <span class="input-group-text">
          <slot name="prepend"/>
        </span>
      </div>
      <input-field :name="name"
                   :value="value"
                   :placeholder="placeholder"
                   :validation="validation"
                   @input="$emit('input', $event)"/>
      <div class="input-group-append" v-if="hasAppendSlot">
        <span class="input-group-text">
          <slot name="append"/>
        </span>
      </div>
      <validation-messages v-if="validation" :title="placeholder" :validation="validation"/>
    </div>
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
  computed: {
    hasPrependSlot() {
      return !!this.$slots.prepend;
    },

    hasAppendSlot() {
      return !!this.$slots.append;
    },
  },
};
</script>
