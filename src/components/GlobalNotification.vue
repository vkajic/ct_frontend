<template>
  <b-alert :variant="type" :show="text" dismissible class="mb-2" @dismissed="removeNotification">
    {{text}}
  </b-alert>
</template>

<script>
import { mapState } from 'vuex';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'GlobalNotification',
  computed: {
    ...mapState('ui', {
      text: state => state.notificationText,
      type: state => state.notificationType,
    }),
  },
  methods: {
    removeNotification() {
      this.$store.commit('ui/hideNotification');
    },
  },
};
</script>
