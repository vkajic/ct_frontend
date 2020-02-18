<template>
  <div>
    <label v-if="label">{{label}}</label>
    <star-rating :value="value" @rating-selected="$emit('input', $event)" :star-size="20"/>
    <validation-messages v-if="validation" :title="label" :validation="validation"/>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating';
import ValidationMessages from './ValidationMessages.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'StarRateGroup',
  components: {
    ValidationMessages,
    StarRating,
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
      type: Number,
      default: null,
    },
    validation: {
      type: Object,
      default: null,
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
