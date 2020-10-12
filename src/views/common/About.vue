<template>
  <div>
      <div class="row mb-6 pt-6">
        <div class="col-12 col-lg-10 offset-lg-1">
          <h1 class="mb-4 font-weight-bold">{{ $t('about.title') }}</h1>
          <div class="mb-4 lead" v-html="$t('about.text')"></div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-lg-10 offset-lg-1 my-5">
          <h2>{{ $t('about.future') }}</h2>
        </div>
      </div>
    </div>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'About',
};
</script>

<style scoped>

</style>
