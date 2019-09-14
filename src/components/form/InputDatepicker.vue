<template>
  <div>
    <label v-if="label">{{label}}</label>
    <datepicker :placeholder="placeholder"
                :id="name"
                :name="name"
                :bootstrap-styling="true"
                :monday-first="true"
                @input="$emit('input', $event)"/>
    <validation-messages v-if="validation" :title="placeholder" :validation="validation"/>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import ValidationMessages from './ValidationMessages.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'InputDatepicker',
  components: {
    ValidationMessages,
    Datepicker,
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
  },
};
</script>
