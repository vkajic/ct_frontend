<template>
  <b-dropdown size="lg" variant="link" class="w-auto px-4" no-caret
              toggle-class="border-0 m-0 p-0 d-flex align-items-center">
    <template v-slot:button-content>
      <span class="small language-button">
        <img src="@/assets/img/langIcon.svg" class="language-icon"/>
      </span>
    </template>
    <b-dropdown-item v-for="l in languages" :key="l.code" @click="selectLanguage(l)">
      {{l.label}}
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'LanguageSwitcher',
  data() {
    return {
      languages: [
        {
          label: 'English',
          code: 'en',
        },
        {
          label: 'Hrvatski',
          code: 'hr',
        },
      ],
    };
  },
  computed: {
    selectedLanguage() {
      const code = this.$i18n.locale;
      return this.languages.find(l => l.code === code).label;
    },
  },
  methods: {
    selectLanguage(l) {
      this.$i18n.locale = l.code;
      this.$router.replace({
        name: this.$route.name,
        params: Object.assign({}, this.$route.params, { lang: l.code }),
      });
    },
  },
};
</script>

<style>
  .language-button {
    line-height: 1;
  }
</style>
