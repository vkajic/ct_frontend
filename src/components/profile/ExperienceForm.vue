<template>
  <div>
    <h1 class="mb-5 d-none d-lg-block">{{ $t('freelancers.work_experience_title') }}</h1>
    <b-form @submit.prevent="save">
      <wysiwyg-textarea-group class="mb-5"
                              v-model="resume"
                              :label="$t('freelancers.resume')"/>

      <hr class="mb-5 d-block">

      <div class="m-0" v-for="(item, index) in $v.items.$each.$iter" :key="index">
        <input-group name="company"
                     class="mb-3"
                     v-model="item.company.$model"
                     :placeholder="$t('freelancers.company_name')"
                     :label="$t('freelancers.company')"
                     :validation="item.company"/>

        <input-group name="title"
                     class="mb-3"
                     v-model="item.title.$model"
                     :placeholder="$t('freelancers.job_title')"
                     :label="$t('freelancers.job_title')"
                     :validation="item.title"/>

        <div class="mb-3">
          <label>{{ $t('freelancers.when_worked') }}</label>
          <b-input-group>
            <datepicker :placeholder="$t('freelancers.from')"
                        name="from"
                        :bootstrap-styling="true"
                        :monday-first="true"
                        v-model="item.from.$model"/>
            <datepicker :placeholder="$t('freelancers.to')"
                        name="to"
                        :bootstrap-styling="true"
                        :monday-first="true"
                        v-model="item.to.$model"/>
            <validation-messages title="From" :validation="item.from"/>
          </b-input-group>
        </div>

        <wysiwyg-textarea-group :label="$t('freelancers.description')"
                                v-model="item.description.$model"
                                class="mb-5"/>

        <hr class="mb-5 d-block">
      </div>

      <div>
        <a href="#" @click="addExperience"><u>{{ $t('freelancers.add_experience') }}</u></a><br>
        <small class="text-muted">{{ $t('freelancers.experience_text') }}</small>
      </div>

      <funnel-buttons :skip-url="skipUrl"
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
import FunnelButtons from './FunnelButtons.vue';
import WysiwygTextareaGroup from '../form/WysiwygTextareaGroup.vue';

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
    WysiwygTextareaGroup,
    FunnelButtons,
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
              text: this.$t('freelancers.experience_saved'),
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
        if (n.workExperiences) {
          this.items = [...n.workExperiences];
        }
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
  computed: {
    skipUrl() {
      return this.skipEnabled ? '/create-freelancer/projects' : null;
    },
  },
};
</script>
