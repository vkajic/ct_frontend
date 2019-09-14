<template>
  <div class="avatar-container">
    <div class="avatar" :style="{'background-image': `url(${image})`}"></div>
  </div>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'AvatarDisplay',
  props: {
    avatar: {
      type: String,
      default: null,
    },
  },
  computed: {
    image() {
      // eslint-disable-next-line global-require
      return this.avatar ? this.avatar : require('@/assets/img/avatar-placeholder.png');
    },
  },
};
</script>
