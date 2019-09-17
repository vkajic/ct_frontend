<template>

</template>

<script>
import Datepicker from 'vuejs-datepicker/src/components/Datepicker.vue';
import InputGroup from '../form/InputGroup.vue';
import ValidationMessages from '../form/ValidationMessages.vue';
import TextareaGroup from '../form/TextareaGroup.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ExperienceItemForm',
  components: {
    TextareaGroup,
    Datepicker,
    ValidationMessages,
    InputGroup,
  },
  props: {
    validation: {
      type: Object,
      default() {
        return {};
      },
    },
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    updateItem() {
      this.$emit('input', this.form);
    },
  },
};
</script>
