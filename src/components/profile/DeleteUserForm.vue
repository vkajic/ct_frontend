<template>
  <div>
    <h1 class="mb-5">{{ $t('users.remove_title') }}</h1>

    <b-form @submit.prevent="save">
      <b-form-checkbox v-model="confirmation"
                       class="mb-3"
                       name="subscribed">{{ $t('users.confirm_remove') }}</b-form-checkbox>

      <div class="pt-5 d-flex flex-column flex-lg-row
        justify-content-center justify-content-lg-end
        align-items-center">
        <b-button type="submit" variant="primary" class="btn-round"
                  :disabled="saving || !confirmation">
          <template v-if="!saving">{{ $t('users.remove_button_label') }}</template>
          <template v-if="saving">{{ $t('users.remove_button_loading') }}</template>
        </b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'DeleteUserForm',
  data() {
    return {
      confirmation: false,
      saving: false,
    };
  },
  methods: {
    async save() {
      const confirm = await this.$bvModal
        .msgBoxConfirm(this.$t('users.remove_confirmation'));

      if (confirm) {
        await this.$store.dispatch('user/removeUser');
        await this.$store.dispatch('ui/showNotification', {
          type: 'success',
          text: this.$t('users.remove_success'),
        });
      }
    },
  },
};
</script>

<style scoped>

</style>
