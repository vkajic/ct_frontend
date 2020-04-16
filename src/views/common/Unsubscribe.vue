<template>
  <div class="row">
    <div class="col-12 col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <paper v-if="unsubscribing">
        <p class="text-center">Please wait, we are unsubscribing you!</p>
        <div class="d-flex justify-content-center p-4">
          <loader-ring/>
        </div>
      </paper>

      <paper v-if="!unsubscribing && !error">
        <h1>Unsubscribed!</h1>
        <p>We are sorry to hear this but you are unsubscribed from all CryptoTask newsletters.</p>
        <p>If you wish to subscribe again please set it in your settings.</p>
        <p><strong>CryptoTask Team</strong></p>
      </paper>

      <paper v-if="!unsubscribing && error">
        <h1>Error!</h1>
        <p>Something went wrong.</p>
        <p>{{error}}</p>
        <p>If this continues to happen please contact us.</p>
        <p><strong>CryptoTask Team</strong></p>
      </paper>
    </div>
  </div>
</template>

<script>
import apiService from '../../services/api.service.js';
import Paper from '../../components/ui/Paper.vue';
import LoaderRing from '../../components/ui/LoaderRing.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Unsubscribe',
  components: { LoaderRing, Paper },
  data() {
    return {
      unsubscribing: true,
      error: null,
    };
  },
  mounted() {
    this.unsubscribing = true;

    const { hash } = this.$route.params;

    apiService.post(`/users/unsubscribe/${hash}`)
      .then(() => {
        this.unsubscribing = false;
        this.$store.commit('user/setUserEmailSubscription', false);
      })
      .catch((err) => {
        this.unsubscribing = false;
        this.error = err.response.data.message;
      });
  },
};
</script>
