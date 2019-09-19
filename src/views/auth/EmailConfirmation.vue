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
import ApiService from '../../services/api.service';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'EmailConfirmation',
  data() {
    return {
      error: null,
    };
  },
  created() {
    const { hash } = this.$route.params;

    if (hash) {
      ApiService.post('auth/email-confirm', { hash })
        .then(() => {
          this.error = null;
          this.$store.dispatch('ui/showNotification', {
            text: 'Email successfully confirmed. Please login with your credentials.',
            type: 'success',
          });
          this.$router.replace('/login');
        })
        .catch((err) => {
          this.$store.dispatch('ui/showNotification', {
            text: err.response.data.message,
            type: 'danger',
          });
        });
    }
  },
};
</script>
