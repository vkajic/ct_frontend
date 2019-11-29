<template>
  <paper>
    <client-basic-info-form :client="client" :redirect-after-save="false"/>
  </paper>
</template>

<script>
import ClientBasicInfoForm from './ClientBasicInfoForm.vue';
import Paper from '../ui/Paper.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'UpdateClient',
  components: {
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
