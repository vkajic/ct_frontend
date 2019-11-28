<template>
  <div class="avatar-container">
    <div class="avatar">
      <image-display v-if="hasAvatar" :file="avatar" :alt="userName" :options="options"/>
      <img v-if="!hasAvatar" :src="avatarPlaceholder" :alt="userName"/>
    </div>
  </div>
</template>

<script>
import ImageDisplay from './ImageDisplay.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'AvatarDisplay',
  components: { ImageDisplay },
  props: {
    userName: {
      type: String,
      default: null,
    },
    avatar: {
      type: Object,
      default() {
        return {};
      },
    },
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    /**
     * Check if avatar exists
     */
    hasAvatar() {
      return !!this.avatar && !!this.avatar.fileName;
    },

    /**
     * Return avatar placeholder image if no avatar uploaded
     * @return {any}
     */
    avatarPlaceholder() {
      // eslint-disable-next-line global-require
      return require('@/assets/img/avatar-placeholder.png');
    },
  },
};
</script>
