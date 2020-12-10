<template>
  <a href="#" @click.prevent="open" class="file-attachment d-flex align-items-center">
    <file-text-icon size="1.6x"/> {{attachment.fileName}}
  </a>
</template>

<script>
import { FileTextIcon } from 'vue-feather-icons';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ChatAttachmentFile',
  components: {
    FileTextIcon,
  },
  props: {
    attachment: {
      type: Object,
      required: true,
    },
    owner: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    async open() {
      this.loading = true;
      try {
        window.open(this.fileUrl);
        this.loading = false;
      } catch (err) {
        this.$store.dispatch('ui/showNotification', {
          type: 'danger',
          text: 'Something went wrong.',
        });
        this.loading = false;
      }
    },
  },
  computed: {
    fileUrl() {
      return `${process.env.VUE_APP_BUCKET_URL}/${this.attachment.fileName}`;
    },
  },
};
</script>
