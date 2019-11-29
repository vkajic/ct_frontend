<template>
  <div style="position:relative;">
    <avatar-picture :file="avatar" :thumbnail="true"/>
    <div :class="{'online-status': true, 'is-online': online}"></div>
  </div>
</template>

<script>
import AvatarPicture from '../../profile/AvatarPicture.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ChatHistoryAvatar',
  components: {
    AvatarPicture,
  },
  props: {
    avatar: {
      type: Object,
      default() {
        return {};
      },
    },
    online: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
