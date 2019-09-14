<template>
  <div class="row">
    <div class="col-12 col-md-10 offset-md-1 col-xxxl-8 offset-xxxl-2">
      <div class="paper">
        <div class="row align-items-stretch">
          <div class="col-md-8">
            <div class="py-5 px-6 py-xxxl-6 px-xxxl-7 auth-form-container h-100">
              <slot/>
            </div>
          </div>
          <div class="col-md-4">
            <div class="py-6 px-4 h-100">
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
