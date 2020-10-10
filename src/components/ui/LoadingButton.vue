<template>
  <b-button :type="type" :variant="variant" :class="styleClass" :disabled="loading">
    {{ loadingLabelString }}
  </b-button>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'LoadingButton',
  props: {
    type: {
      type: String,
      default: '',
    },
    variant: {
      type: String,
      default: 'primary',
    },
    styleClass: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: true,
    },
    loadingLabel: {
      type: String,
      default: null,
    },
  },
  computed: {
    loadingLabelString() {
      const loadingLabel = this.loadingLabel ? this.loadingLabel : this.$t('chat.loading');
      return this.loading ? loadingLabel : this.label;
    },
  },
};
</script>
