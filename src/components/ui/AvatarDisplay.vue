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
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    image() {
      return this.avatar && this.avatar.fileName
        ? process.env.VUE_APP_PUBLIC_BUCKET + this.avatar.fileName
        // eslint-disable-next-line global-require
        : require('@/assets/img/avatar-placeholder.png');
    },
  },
};
</script>
