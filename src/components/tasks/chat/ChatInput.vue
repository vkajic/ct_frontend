<template>
  <div class="row">
    <b-form inline class="chat-input p-2 w-100" @submit.prevent="send">
      <b-input-group class="w-100 d-flex">
        <b-input-group-prepend>
          <b-button variant="info" @click.prevent="openUploader">+</b-button>
        </b-input-group-prepend>
        <b-form-input v-model="message" class="flex-grow-1"/>
        <b-input-group-append>
          <b-button variant="success" type="submit">Send</b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form>
  </div>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ChatInput',
  data() {
    return {
      message: null,
    };
  },
  methods: {
    send() {
      if (this.message) {
        this.$emit('send', this.message);
        this.message = null;
      }
    },
    openUploader() {
      this.$store.commit('chat/openAttachmentUploader');
    },
  },
};
</script>
