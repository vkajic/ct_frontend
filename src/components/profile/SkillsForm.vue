<template>
  <div>
    <h1 class="mb-5 d-none d-lg-block">My skills & services</h1>

    <b-form @submit.prevent="save">
      <input-tags label="Roles I'm interested in"
                  class="mb-3"
                  v-model="form.categories"
                  :options="categories"
                  placeholder="Select roles"
                  options-label="name"
                  :validation="$v.form.categories"/>

      <input-tags label="Skills"
                  class="mb-3"
                  v-model="form.skills"
                  placeholder="Select skills"
                  :options="skills"
                  options-label="name"
                  :validation="$v.form.skills"/>

      <funnel-buttons :saving="saving"
                      submit-text="Next: Work experience"
                      skip-url="/create-freelancer/work-experience"/>
    </b-form>
  </div>
</template>

<script>
import { required } from 'vuelidate/src/validators';
import InputTags from '../form/InputTags.vue';
import FunnelButtons from './FunnelButtons.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'SkillsForm',
  components: { FunnelButtons, InputTags },
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
          this.$router.push('/create-freelancer/work-experience');
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
        this.form = Object.assign({}, this.form, {
          skills: n.skills,
          categories: n.categories,
        });
      }
    },
  },
  mounted() {
    if (this.freelancer && this.freelancer.id) {
      this.form = Object.assign({}, this.form, {
        skills: this.freelancer.skills,
        categories: this.freelancer.categories,
      });
    }
  },
  computed: {
    /**
     * Get all categories
     */
    categories() {
      return this.$store.state.util.skills;
    },

    /**
     * Return only skills for selected categories
     * @return {Array}
     */
    skills() {
      const selectedIds = this.form.categories ? this.form.categories.map(r => r.id) : [];
      const selectedRoles = this.$store.state.util.skills
        .filter(r => selectedIds.indexOf(r.id) > -1);

      const skills = [];

      selectedRoles.forEach((r) => {
        skills.push(...r.skills);
      });

      return skills;
    },
  },
};
</script>
