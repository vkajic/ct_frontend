<template>
  <b-modal :visible="visible"
           @hidden="close"
           :ok-only="true"
           @ok="attach"
           size="lg"
           :ok-disabled="okDisabled">
    <vue-dropzone ref="myVueDropzone"
                  id="dropzone"
                  :options="dropzoneOptions"
                  @vdropzone-success="success"
                  @vdropzone-complete="done"
                  @vdropzone-file-added="uploadStarted"/>
  </b-modal>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ChatAttachmentUploader',
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      files: [],
      uploading: false,
    };
  },
  computed: {
    visible() {
      return this.$store.state.chat.attachmentUploaderVisible;
    },
    token() {
      return this.$store.state.user.token;
    },
    dropzoneOptions() {
      return {
        url: `${process.env.VUE_APP_API_URL}messages/upload/${this.$route.params.id}`,
        headers: { Authorization: `Bearer ${this.token}` },
        createImageThumbnails: false,
      };
    },
    fileIds() {
      return this.files.map(f => f.id);
    },
    okDisabled() {
      return !this.files.length || this.uploading;
    },
  },
  methods: {
    close() {
      this.$store.commit('chat/closeAttachmentUploader');
      this.files = [];
    },
    success(file, res) {
      this.files.push(res.data);
    },
    attach() {
      this.$emit('attach', this.fileIds);
    },
    uploadStarted() {
      this.uploading = true;
    },
    done() {
      this.uploading = false;
    },
  },
  destroyed() {
    this.files = [];
  },
};
</script>
