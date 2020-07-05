<template>
  <div class="row">
    <div class="col-12 col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <paper v-if="unsubscribing">
        <p class="text-center">{{$t('newsletter.unsubscribe_title')}}</p>
        <div class="d-flex justify-content-center p-4">
          <loader-ring/>
        </div>
      </paper>

      <paper v-if="!unsubscribing && !error" v-html="$t('newsletter.unsubscribed')"></paper>

      <paper v-if="!unsubscribing && error"
             v-html="$t('newsletter.unsubscribe_error', { error: error })"></paper>
    </div>
  </div>
</template>

<script>
import apiService from '../../services/api.service';
import Paper from '../../components/ui/Paper.vue';
import LoaderRing from '../../components/ui/LoaderRing.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Unsubscribe',
  components: {
    LoaderRing,
    Paper,
  },
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
