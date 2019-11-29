<template>
  <div style="position:relative;">
    <avatar-display :avatar="avatar" :options="avatarOptions"/>
    <div :class="{'online-status': true, 'is-online': online}"></div>
  </div>
</template>

<script>
import AvatarDisplay from '../../ui/AvatarDisplay.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ChatHistoryAvatar',
  components: {
    AvatarDisplay,
  },
  data() {
    return {
      avatarOptions: {
        resize: {
          width: 40,
          height: 40,
        },
      },
    };
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
