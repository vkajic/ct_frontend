<template>
  <div class="row">
    <div class="col-12 col-lg-9">
      <client-profile-preview :client="client" v-if="client.id"/>
    </div>
  </div>
</template>

<script>
import ClientProfilePreview from '../../components/client/ClientProfilePreview.vue';
import apiService from '../../services/api.service';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Client',
  components: {
    ClientProfilePreview,
  },
  data() {
    return {
      loading: false,
      client: {},
    };
  },
  created() {
    this.loadClient();
  },
  methods: {
    async loadClient() {
      this.loading = true;
      try {
        const res = await apiService.get(`/clients/${this.$route.params.id}`);
        this.client = res.data.data;
        this.loading = false;
      } catch (e) {
        if (e.response && e.response.status === 404) {
          this.$router.replace({ name: '404' });
        }
      }
    },
  },
};
</script>
