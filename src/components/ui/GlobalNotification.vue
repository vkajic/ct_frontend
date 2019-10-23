<template>
  <div class="global-notification d-flex justify-content-center">
    <b-alert :variant="type" :show="text" dismissible @dismissed="removeNotification">
      {{text}}

      <template slot="dismiss">
        <x-circle-icon size="1x"/>
      </template>
    </b-alert>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { XCircleIcon } from 'vue-feather-icons';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'GlobalNotification',
  components: {
    XCircleIcon,
  },
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
