<template>
  <div class="row">
    <div class="col-12 col-lg-9">
      Your affiliate link: {{currentUrlBase}}/{{currentLang}}/sign-up?referrer={{userId}}
    </div>
  </div>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Affiliate',
  components: {
  },
  computed: {
    userId() {
      return this.$store.state.user.user.id;
    },
    currentUrlBase() {
      return window.location.origin;
    },
    currentLang() {
      return this.$route.params.lang;
    },
  },
};
</script>
