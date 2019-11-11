<template>
  <div class="paper px-7 py-6">
    <client-basic-info-form :client="client" :redirect-after-save="false"/>
  </div>
</template>

<script>
import ClientBasicInfoForm from './ClientBasicInfoForm.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'UpdateClient',
  components: { ClientBasicInfoForm },
  computed: {
    client() {
      return this.$store.state.user.user ? this.$store.state.user.user.client : null;
    },
  },
};
</script>
