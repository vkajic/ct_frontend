<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <b-card title="Confirming email address">
        <b-alert variant="danger" :show="error">
          {{error}}
        </b-alert>

        <span v-if="!error">We are confirming your email address. Please hold!</span>
      </b-card>
    </div>
  </div>
</template>

<script>
import ApiService from '../services/api.service';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'EmailConfirmation',
  data() {
    return {
      error: null,
    };
  },
  mounted() {
    const { hash } = this.$route.params;

    if (hash) {
      ApiService.post('auth/email-confirm', { hash })
        .then(() => {
          this.error = null;
          this.$router.replace('/login');
          this.$store.dispatch('ui/showNotification', {
            text: 'Email successfully confirmed. Please login with your credentials.',
            type: 'success',
          });
        })
        .catch((err) => {
          this.error = err.response.data.message;
        });
    }
  },
};
</script>
