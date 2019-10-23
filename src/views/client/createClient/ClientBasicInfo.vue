<template>
  <page-wrapper :show-menu="false" :menu-width="2">
    <div class="paper px-7 py-6">
      <client-basic-info-form :client="client" :redirect-after-save="true"/>
    </div>
  </page-wrapper>
</template>

<script>
import ClientBasicInfoForm from '../../../components/client/ClientBasicInfoForm.vue';
import PageWrapper from '../../../components/ui/PageWrapper.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ClientBasicInfo',
  components: {
    PageWrapper,
    ClientBasicInfoForm,
  },
  computed: {
    client() {
      return this.$store.state.user.user ? this.$store.state.user.user.client : null;
    },
  },
};
</script>
