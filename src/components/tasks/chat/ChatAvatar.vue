<template>
  <avatar-display :avatar="avatar" user-name="Avatar" :options="avatarOptions"/>
</template>

<script>
import AvatarDisplay from '../../ui/AvatarDisplay.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ChatAvatar',
  components: { AvatarDisplay },
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
    message: {
      type: Object,
      required: true,
    },
  },
  computed: {
    sender() {
      return this.message.sender[this.message.role];
    },
    avatar() {
      return this.sender ? this.sender.avatar : null;
    },
  },
};
</script>
