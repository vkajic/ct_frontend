<template>
  <div>
    <sun-icon size="3x" class="text-muted mb-4"/>
    <div>
      <strong class="d-block mb-3">Why Cryptotask</strong>
      <ul class="list-unstyled m-0">
        <li class="mb-3">More high paying clients</li>
        <li class="mb-3">Just 3% fees</li>
        <li>Effective escrow and dispute mechanism</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { SunIcon } from 'vue-feather-icons';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'AuthDescription',
  components: {
    SunIcon,
  },
};
</script>
