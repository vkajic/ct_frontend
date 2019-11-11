<template>
  <div class="attachment" v-if="!deleted">
    <chat-attachment-image :attachment="attachment"
                           :owner="owner"
                           v-if="isImage"
                           @delete="deleteAttachment"/>
    <chat-attachment-file :attachment="attachment"
                          :owner="owner"
                          v-if="!isImage"
                          @delete="deleteAttachment"/>
  </div>
</template>

<script>
import apiService from '../../../services/api.service';
import ChatAttachmentImage from './ChatAttachmentImage.vue';
import ChatAttachmentFile from './ChatAttachmentFile.vue';

const imageTypes = [
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/bmp',
  'image/tiff',
];

/* const typeMappings = {
  'text/csv': 'csv',
  'text/css': 'css',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'doc',
  'text/html': 'html',
  'application/pdf': 'pdf',
  'image/vnd.adobe.photoshop': 'psd',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'ppt',
  'application/vnd.ms-powerpoint': 'ppt',
  'image/svg+xml': 'svg',
  'text/plain': 'txt',
  'application/vnd.ms-excel': 'xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xls',
  'application/zip': 'zip',
  'application/x-rar-compressed': 'zip',
}; */

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ChatAttachment',
  components: {
    ChatAttachmentFile,
    ChatAttachmentImage,
  },
  data() {
    return {
      loading: false,
      deleted: false,
    };
  },
  props: {
    attachment: {
      type: Object,
      required: true,
    },
    message: {
      type: Object,
      required: true,
    },
  },
  methods: {
    /**
     * Delete attachment
     * @return {Promise<void>}
     */
    async deleteAttachment() {
      if (this.owner) {
        try {
          await apiService.delete(`/files/${this.attachment.id}`);
          this.deleted = true;
          this.$emit('delete', this.attachment);
        } catch (err) {
          this.$store.dispatch('ui/showNotification', {
            type: 'danger',
            text: 'Something went wrong.',
          });
        }
      }
    },
  },
  computed: {
    /**
     * Is current attachment image or file
     */
    isImage() {
      return imageTypes.indexOf(this.attachment.type) > -1;
    },

    /**
     * Is user owner of attachment
     * @return {boolean}
     */
    owner() {
      return this.attachment.uploadedBy === this.$store.state.user.user.id;
    },
  },
};
</script>
