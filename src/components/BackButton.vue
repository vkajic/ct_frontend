<template>
  <a @click="$router.go(-1)">
    <img src="@/assets/img/back.svg" alt="Back"/>
    <span class="back">Back</span>
  </a>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'BackButton',
};
</script>
