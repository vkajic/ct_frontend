<template>
  <avatar-picture :file="avatar"/>
</template>

<script>
import AvatarPicture from '../../profile/AvatarPicture.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ChatAvatar',
  components: { AvatarPicture },
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  computed: {
    avatar() {
      const sender = this.message.sender[this.message.role];

      return sender ? sender.avatar : null;
    },
  },
};
</script>
