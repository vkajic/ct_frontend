<template>
  <div class="attachment" v-if="!deleted">
    <template v-if="isImage && thumbnailUrl">
      <div class="image-info d-flex align-items-center justify-content-between">
        <div>{{attachment.fileName}}</div>
        <b-dropdown size="sm" variant="link" toggle-class="text-decoration-none" no-caret
                    v-if="owner">
          <template slot="button-content">
            <more-horizontal-icon size="1.5x"/>
          </template>
          <b-dropdown-item href="#" @click="deleteAttachment">Delete</b-dropdown-item>
        </b-dropdown>
      </div>
      <a href="#" @click.prevent="open" class="image-attachment">
        <img :src="thumbnailUrl" class="thumbnail" :alt="alt"/>
      </a>
    </template>
    <template v-if="!isImage">
      <a href="#" @click.prevent="open" class="file-attachment d-flex align-items-center">
        <file-text-icon size="1.6x"/> {{attachment.fileName}}
      </a>
    </template>
  </div>
</template>

<script>
import { FileTextIcon, MoreHorizontalIcon } from 'vue-feather-icons';
import apiService from '../../../services/api.service';

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
    FileTextIcon,
    MoreHorizontalIcon,
  },
  data() {
    return {
      loading: false,
      isImage: false,
      thumbnailUrl: null,
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
  created() {
    const isImage = imageTypes.indexOf(this.attachment.type) > -1;

    if (isImage) {
      this.loading = true;
      this.isImage = true;

      /**
       * Fetch attachment thumbnail url if attachment is image
       */
      this.$store.dispatch('ui/getThumbnailUrl', this.attachment.id)
        .then(() => {
          const file = this.$store.state.ui.thumbnailUrls[this.attachment.id];
          this.thumbnailUrl = file.url;
          this.loading = false;
        })
        .catch(() => {
          this.$store.dispatch('ui/showNotification', {
            type: 'danger',
            text: 'Something went wrong.',
          });
          this.loading = false;
        });
    }
  },
  methods: {
    /**
     * Get attachment url and open it in new window to download it
     */
    async open() {
      this.loading = true;
      try {
        await this.$store.dispatch('ui/getFileUrl', this.attachment.id);
        const file = this.$store.state.ui.fileUrls[this.attachment.id];
        if (file) {
          window.open(file.url);
        }
      } catch (err) {
        this.$store.dispatch('ui/showNotification', {
          type: 'danger',
          text: 'Something went wrong.',
        });
        this.loading = false;
      }
    },

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
    alt() {
      return `${this.attachment.fileName}`;
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
