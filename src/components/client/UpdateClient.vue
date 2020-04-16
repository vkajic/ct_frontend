<template>
  <div>
    <paper class="mb-5">
      <client-basic-info-form :client="client" :redirect-after-save="false"/>
    </paper>

    <paper>
      <newsletter-subscription-form/>
    </paper>
  </div>
</template>

<script>
import ClientBasicInfoForm from './ClientBasicInfoForm.vue';
import Paper from '../ui/Paper.vue';
import NewsletterSubscriptionForm from '../profile/NewsletterSubscriptionForm.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'UpdateClient',
  components: {
    NewsletterSubscriptionForm,
    Paper,
    ClientBasicInfoForm,
  },
  computed: {
    client() {
      return this.$store.state.user.user ? this.$store.state.user.user.client : null;
    },
  },
};
</script>
