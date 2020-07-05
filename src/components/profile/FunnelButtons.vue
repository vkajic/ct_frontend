<template>
  <div class="pt-5 d-flex flex-column flex-lg-row
        justify-content-center justify-content-lg-end
        align-items-center">
    <router-link :to="skipUrl" class="mr-3 d-none d-lg-block" v-if="skipUrl">{{
      $t('freelancers.skip') }}
    </router-link>
    <b-button type="submit" variant="primary"
              class="btn-round mb-3 mb-lg-0" :disabled="saving">
      <template v-if="!saving">{{submitText}}</template>
      <template v-if="saving">{{ $t('freelancers.saving') }}</template>
    </b-button>
    <router-link :to="skipUrl" class="d-lg-none" v-if="skipUrl">
      {{ $t('freelancers.skip') }}
    </router-link>
  </div>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'FunnelButtons',
  props: {
    submitText: {
      type: String,
      required: true,
    },
    skipUrl: {
      type: String,
      default: null,
    },
    saving: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
