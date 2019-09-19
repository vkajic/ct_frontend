<template>
  <div class="row">
    <div class="col-2 pt-5">
      <left-menu/>
    </div>
    <div class="col-8">
      <div class="paper px-7 py-6">
        <client-basic-info-form :client="client"/>
      </div>
    </div>
  </div>
</template>

<script>
import ClientBasicInfoForm from '../../../components/client/ClientBasicInfoForm.vue';
import LeftMenu from '../../../components/layout/LeftMenu.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ClientBasicInfo',
  components: {
    LeftMenu,
    ClientBasicInfoForm,
  },
  computed: {
    client() {
      return this.$store.state.user.user ? this.$store.state.user.user.client : null;
    },
  },
};
</script>
