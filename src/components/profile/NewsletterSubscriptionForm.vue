<template>
  <div>
    <h1 class="mb-5">{{$t('newsletter.setting_title')}}</h1>

    <b-form @submit.prevent="save">
      <b-form-checkbox v-model="subscribed"
                       class="mb-3"
                       name="subscribed">
        {{$t('newsletter.checkbox_label')}}
      </b-form-checkbox>

      <div class="pt-5 d-flex flex-column flex-lg-row
        justify-content-center justify-content-lg-end
        align-items-center">
        <b-button type="submit" variant="primary" class="btn-round" :disabled="saving">
          <template v-if="!saving">{{$t('newsletter.button_label')}}</template>
          <template v-if="saving">{{$t('newsletter.button_loading')}}</template>
        </b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'NewsletterSubscriptionForm',
  data() {
    return {
      subscribed: false,
      saving: false,
    };
  },
  computed: {
    emailSubscribed() {
      return this.$store.state.user.user.emailSubscribed;
    },
  },
  mounted() {
    this.subscribed = this.emailSubscribed;
  },
  methods: {
    async save() {
      await this.$store.dispatch('user/newsletterToggleSubscription', this.subscribed);
      await this.$store.dispatch('ui/showNotification', {
        type: 'success',
        text: this.$t('newsletter.update_success'),
      });
    },
  },
};
</script>
