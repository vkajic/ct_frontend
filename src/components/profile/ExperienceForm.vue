<template>
  <div>
    <h1 class="mb-5 d-none d-lg-block">Work experience</h1>
    <b-form @submit.prevent="save">
      <textarea-group name="resume"
                      class="mb-5"
                      :rows="10"
                      :max-rows="20"
                      v-model="resume"
                      label="Resume"/>

      <hr class="mb-5 d-block">

      <div class="m-0" v-for="(item, index) in $v.items.$each.$iter" :key="index">
        <input-group name="company"
                     class="mb-3"
                     v-model="item.company.$model"
                     placeholder="Company name"
                     label="Company"
                     :validation="item.company"/>

        <input-group name="title"
                     class="mb-3"
                     v-model="item.title.$model"
                     placeholder="Job title"
                     label="Job title"
                     :validation="item.title"/>

        <div class="mb-3">
          <label>When have you worked there</label>
          <b-input-group>
            <datepicker placeholder="From"
                        name="from"
                        :bootstrap-styling="true"
                        :monday-first="true"
                        v-model="item.from.$model"/>
            <datepicker placeholder="To"
                        name="to"
                        :bootstrap-styling="true"
                        :monday-first="true"
                        v-model="item.to.$model"/>
            <validation-messages title="From" :validation="item.from"/>
          </b-input-group>
        </div>

        <textarea-group name="description"
                        class="mb-5"
                        :rows="15"
                        :max-rows="20"
                        v-model="item.description.$model"
                        label="Description"/>

        <hr class="mb-5 d-block">
      </div>

      <div>
        <a href="#" @click="addExperience"><u>Add work experience</u></a><br>
        <small class="text-muted">
          Not required but recommended to enter at least last three positions
        </small>
      </div>

      <funnel-buttons skip-url="/create-freelancer/projects"
                      :submit-text="saveButtonText"
                      :saving="saving"/>
    </b-form>
  </div>
</template>

<script>
import { required } from 'vuelidate/src/validators';
import Datepicker from 'vuejs-datepicker/src/components/Datepicker.vue';
import InputGroup from '../form/InputGroup.vue';
import ValidationMessages from '../form/ValidationMessages.vue';
import TextareaGroup from '../form/TextareaGroup.vue';
import FunnelButtons from './FunnelButtons.vue';

const initialForm = {
  company: null,
  title: null,
  from: null,
  to: null,
  description: null,
};

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ExperienceForm',
  components: {
    FunnelButtons,
    TextareaGroup,
    ValidationMessages,
    Datepicker,
    InputGroup,
  },
  props: {
    freelancer: {
      type: Object,
      default() {
        return {};
      },
    },
    skipEnabled: {
      type: Boolean,
      default: true,
    },
    saveButtonText: {
      type: String,
      default: 'Next: Add Projects',
    },
    redirectionEnabled: {
      type: Boolean,
      default: true,
    },
  },
  validations: {
    items: {
      $each: {
        company: {
          required,
        },
        title: {
          required,
        },
        from: {
          required,
        },
        to: {},
        description: {},
      },
    },
  },
  data() {
    return {
      resume: null,
      items: [],
      saving: false,
    };
  },
  methods: {
    addExperience(e) {
      e.preventDefault();
      this.items.push(Object.assign({}, initialForm));
    },
    async save() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saving = true;

        try {
          await this.$store.dispatch('user/updateFreelancerExperience', {
            resume: this.resume,
            items: this.items,
          });
          this.saving = false;
          if (this.redirectionEnabled) {
            this.$router.push('/create-freelancer/projects');
          } else {
            this.$store.dispatch('ui/showNotification', {
              type: 'success',
              text: 'Previous experience saved',
            });
          }
        } catch (err) {
          this.$store.dispatch('ui/showNotification', {
            type: 'danger',
            text: err.message,
          });
          this.saving = false;
        }
      }
    },
  },
  watch: {
    freelancer(n) {
      if (n && n.id) {
        this.items = [...n.workExperiences];
        this.resume = n.resume;
      }
    },
  },
  mounted() {
    if (this.freelancer && this.freelancer.workExperiences) {
      this.items = [...this.freelancer.workExperiences];
      this.resume = this.freelancer.resume;
    }
  },
};
</script>
