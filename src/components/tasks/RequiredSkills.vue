<template>
  <div class="required-skills">
    <div class="small-heading mb-4">{{$t('tasks.details.required_skills')}}</div>

    <ul class="list-unstyled">
      <li v-for="(skill, index) in skillItems" :key="index"><span>{{skill}}</span></li>
    </ul>
  </div>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'RequiredSkills',
  props: {
    skills: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    skillItems() {
      const currentLanguage = this.$store.getters['util/getCurrentLanguage'];

      if (this.skills.length) {
        return this.skills
          .map(s => s.translations
            .filter(t => t.languageId === currentLanguage.id)[0]
            .displayTranslation);
      }

      return [];
    },
  },
};
</script>
