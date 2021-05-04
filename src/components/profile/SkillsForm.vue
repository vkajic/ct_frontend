<template>
  <div>
    <h1 class="mb-5 d-none d-lg-block">{{ $t('freelancers.my_skills') }}</h1>

    <b-form @submit.prevent="save">
      <input-tags :label="$t('freelancers.roles_interested')"
                  class="mb-3"
                  v-model="form.categories"
                  :options="categories"
                  :placeholder="$t('freelancers.select_roles')"
                  options-label="name"
                  :validation="$v.form.categories"/>

      <input-tags :label="$t('freelancers.skills')"
                  class="mb-3"
                  v-model="form.skills"
                  :placeholder="$t('freelancers.select_skills')"
                  :options="skills"
                  options-label="name"
                  :validation="$v.form.skills"/>

      <funnel-buttons :saving="saving"
                      :submit-text="$t('freelancers.next_experience')"/>
    </b-form>
  </div>
</template>

<script>
import { required } from 'vuelidate/src/validators';
import InputTags from '../form/InputTags.vue';
import FunnelButtons from './FunnelButtons.vue';
import languageRouter from '../mixins/languageRouter';
import extract from '../../lib/extractLanguage';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'SkillsForm',
  components: {
    FunnelButtons,
    InputTags,
  },
  mixins: [languageRouter],
  props: {
    freelancer: {
      type: Object,
      default: null,
    },
  },
  validations: {
    form: {
      categories: {
        required,
      },
      skills: {
        required,
      },
    },
  },
  data() {
    return {
      form: {
        categories: [],
        skills: [],
      },
      saving: false,
    };
  },
  methods: {
    async save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.saving = true;

        try {
          await this.$store.dispatch('user/updateFreelancerSkills', this.form);
          this.saving = false;
          this.push('/create-freelancer/work-experience');
        } catch (err) {
          this.$store.dispatch('ui/showNotification', {
            type: 'danger',
            text: err.message,
          });
          this.saving = false;
        }
      }
    },

    setForm() {
      if (this.freelancer && this.currentLanguage) {
        this.form = Object.assign({}, this.form, {
          skills: extract(this.freelancer.skills, this.currentLanguage.id),
          categories: extract(this.freelancer.categories, this.currentLanguage.id),
        });
      }
    },
  },
  watch: {
    freelancer() {
      this.setForm();
    },
    currentLanguage() {
      this.setForm();
    },
  },
  mounted() {
    this.setForm();
  },
  computed: {
    /**
     * Get all categories
     */
    categories() {
      return this.$store.getters['util/getCategories'];
    },

    /**
     * Return only skills for selected categories
     * @return {Array}
     */
    skills() {
      const selectedIds = this.form.categories ? this.form.categories.map(r => r.id) : [];
      return this.$store.getters['util/getSkillsByCategories'](selectedIds);
    },

    /**
     * Get current language
     * @returns {*}
     */
    currentLanguage() {
      return this.$store.getters['util/getCurrentLanguage'];
    },
  },
};
</script>
