<template>
  <div>
    <h1 class="mb-5">Remove user profile</h1>

    <b-form @submit.prevent="save">
      <b-form-checkbox v-model="confirmation"
                       class="mb-3"
                       name="subscribed">
        Confirm profile removal
      </b-form-checkbox>

      <div class="pt-5 d-flex flex-column flex-lg-row
        justify-content-center justify-content-lg-end
        align-items-center">
        <b-button type="submit" variant="primary" class="btn-round"
                  :disabled="saving || !confirmation">
          <template v-if="!saving">Remove profile</template>
          <template v-if="saving">Deleting...</template>
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
        .msgBoxConfirm('Are you sure you want to delete your user profile?');

      if (confirm) {
        await this.$store.dispatch('user/removeUser');
        await this.$store.dispatch('ui/showNotification', {
          type: 'success',
          text: 'Your profile has been deleted successfully!',
        });
      }
    },
  },
};
</script>

<style scoped>

</style>
