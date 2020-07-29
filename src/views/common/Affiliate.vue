<template>
  <div class="row">
    <div class="col-12 col-lg-9">
      <h1 class="mb-5">{{ $t('affiliate.title') }}</h1>
      <div class="mb-4 lead">
        <p>
          {{ $t('affiliate.introduction') }}
        </p>
        {{ $t('affiliate.affiliate_link') }}
        <ul class="list-tags list-unstyled list-inline mb-lg-5">
          <li class="list-inline-item"><div class="tag-item d-block mb-2"><div class="lead">
            {{currentUrlBase}}/{{currentLang}}/sign-up?referrer={{userId}}
          </div></div></li>
        </ul>
        {{ $t('affiliate.num_invitees', {numOfInvitees: numOfInvitees}) }}
      </div>
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
    numOfInvitees() {
      return this.$store.state.user.user.invitees.length;
    },
  },
};
</script>
