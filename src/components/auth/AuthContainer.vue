<template>
  <div class="row">
    <div class="col-12 col-lg-10 offset-lg-1 col-xxxl-8 offset-xxxl-2">
      <div class="paper">
        <div class="row align-items-stretch">
          <div class="col-12 col-lg-8">
            <div class="p-4 py-lg-5 px-lg-6 py-xxxl-6 px-xxxl-7 auth-form-container h-100">
              <slot/>
            </div>
          </div>
          <div class="col-12 col-lg-4">
            <div class="p-4 py-lg-6 px-lg-4 h-100 d-flex align-items-center">
              <auth-description/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthDescription from './AuthDescription.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'AuthContainer',
  components: { AuthDescription },
};
</script>
