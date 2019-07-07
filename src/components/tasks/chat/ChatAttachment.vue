<template>
  <div class="attachment">
    <template v-if="isImage && thumbnailUrl">
      <a href="#" @click.prevent="open">
        <img :src="thumbnailUrl" class="thumbnail" :alt="alt"/>
      </a>
    </template>
    <template v-if="!isImage">
      <a href="#" @click.prevent="open">
        <img :src="require(`@/assets/img/fileTypes/${icon}`)" class="icon" :alt="alt"/>
      </a>
    </template>
  </div>
</template>

<script>
import ChatService from '../../../services/chat.service';

const imageTypes = [
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/bmp',
  'image/tiff',
];

const typeMappings = {
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
};

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ChatAttachment',
  data() {
    return {
      loading: false,
      isImage: false,
      thumbnailUrl: null,
    };
  },
  props: {
    attachment: {
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
      ChatService.getAttachmentThumbnail(this.attachment.id)
        .then((data) => {
          this.thumbnailUrl = data.data.data;
          this.loading = false;
        });
    }
  },
  methods: {
    /**
     * Get attachment url and open it in new window to download it
     */
    open() {
      this.loading = true;
      ChatService.getAttachmentUrl(this.attachment.id)
        .then((data) => {
          window.open(data.data.data);
          this.loading = false;
        });
    },
  },
  computed: {
    alt() {
      return `attachment ${this.attachment.id}`;
    },

    icon() {
      return this.attachment && typeMappings[this.attachment.type]
        ? `${typeMappings[this.attachment.type]}.svg`
        : 'file.svg';
    },
  },
};
</script>
