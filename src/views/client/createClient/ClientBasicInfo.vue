<template>
  <page-wrapper :show-menu="false" :show-chat="false" :menu-width="2">
    <div class="row">
      <div class="col-12 col-lg-9">
        <paper>
          <client-basic-info-form :client="client" :redirect-after-save="true"/>
        </paper>
      </div>
    </div>
  </page-wrapper>
</template>

<script>
import ClientBasicInfoForm from '../../../components/client/ClientBasicInfoForm.vue';
import PageWrapper from '../../../components/ui/PageWrapper.vue';
import Paper from '../../../components/ui/Paper.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ClientBasicInfo',
  components: {
    Paper,
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
