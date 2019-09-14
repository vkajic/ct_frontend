<template>
  <div>
    <a class="d-block cursor-pointer unread-messages"
       id="popover-button-sync">{{count}}</a>
    <b-popover
      target="popover-button-sync"
      triggers="click focus"
      placement="bottomleft">
      <b-list-group :flush="true">
        <b-list-group-item href="#" class="flex-column align-items-start p-0"
                           v-for="(message, index) in unreadMessages"
                           :key="index"
                           @click.prevent="goToApplication(message.id)">
          <h5 class="mb-1 mt-1">{{message.title}}</h5>
          <small class="mb-1">{{message.createdAt}}</small>
          <p class="mb-1">{{message.text}}</p>
        </b-list-group-item>
      </b-list-group>
    </b-popover>
  </div>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'UnreadMessagesList',
  computed: {
    unreadMessages() {
      return this.$store.state.chat.unreadMessages;
    },
    count() {
      return this.unreadMessages.length;
    },
  },
  methods: {
    togglePopover() {
      this.show = !this.show;
    },
    goToApplication(applicationId) {
      this.$router.push({
        name: 'application',
        params: { id: applicationId },
      });
    },
  },
};
</script>
