<template>
  <b-button variant="info"
            class="btn-round"
            @click.prevent="clicked">
    {{ $t('freelancer_info.invite_button') }}
  </b-button>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'InviteButton',
  methods: {
    clicked() {
      this.$emit('click');
    },
  },
};
</script>

<style scoped>

</style>
