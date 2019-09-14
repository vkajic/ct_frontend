<template>
  <b-form @submit.prevent="save" class="m-0">
    <input-group name="company"
                 class="mb-3"
                 v-model="form.company"
                 placeholder="Company name"
                 label="Company"
                 :validation="$v.form.company"/>

    <input-group name="job"
                 class="mb-3"
                 v-model="form.job"
                 placeholder="Job title"
                 label="Job title"
                 :validation="$v.form.job"/>

    <div class="mb-3">
      <label>When have you worked there</label>
      <b-input-group>
        <datepicker placeholder="From"
                    name="from"
                    :bootstrap-styling="true"
                    :monday-first="true"
                    v-model="form.from"/>
        <datepicker placeholder="To"
                    name="to"
                    :bootstrap-styling="true"
                    :monday-first="true"
                    v-model="form.to"/>
        <validation-messages title="From" :validation="$v.form.from"/>
      </b-input-group>
    </div>

    <textarea-group name="description"
                    class="mb-5"
                    :rows="15"
                    :max-rows="20"
                    v-model="form.description"
                    label="Description"/>

    <hr class="mb-5 d-block">
  </b-form>
</template>

<script>
import Datepicker from 'vuejs-datepicker/src/components/Datepicker.vue';
import { required } from 'vuelidate/src/validators';
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
  validations: {
    form: {
      company: {
        required,
      },
      job: {
        required,
      },
      from: {
        required,
      },
    },
  },
  data() {
    return {
      form: {
        company: '',
        job: '',
        from: null,
        to: null,
        description: null,
      },
    };
  },
  methods: {
    save() {
      this.$v.$touch();
    },
  },
};
</script>
