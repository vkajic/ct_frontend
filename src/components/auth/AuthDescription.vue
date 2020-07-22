<template>
  <div>
    <div>
      <strong class="d-block mb-3 font-14-sm">{{$t('auth.info.why_cryptotask')}}</strong>
      <ul class="list-unstyled m-0">
        <li class="mb-3 font-12-sm">{{$t('auth.info.line1')}}</li>
        <li class="mb-3 font-12-sm">{{$t('auth.info.line2')}}</li>
        <li class="font-12-sm">{{$t('auth.info.line3')}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'AuthDescription',
};
</script>
