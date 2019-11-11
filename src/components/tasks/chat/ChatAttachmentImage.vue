<template>
  <div>
    <div class="image-info d-flex align-items-center justify-content-between">
      <div>{{attachment.fileName}}</div>
      <b-dropdown size="sm" variant="link" toggle-class="text-decoration-none" no-caret
                  v-if="owner">
        <template slot="button-content">
          <more-horizontal-icon size="1.5x"/>
        </template>
        <b-dropdown-item href="#" @click="$emit('delete', attachment)">Delete</b-dropdown-item>
      </b-dropdown>
    </div>
    <a href="#" @click.prevent="open" class="image-attachment">
      <img :src="thumbnailUrl" class="thumbnail img-fluid" :alt="alt"/>
    </a>
    <b-modal v-model="modalShow" :hide-footer="true" :title="attachment.fileName">
      <div class="d-flex justify-content-center">
        <img :src="imageUrl" :alt="alt" class="img-fluid"/>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { MoreHorizontalIcon } from 'vue-feather-icons';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ChatAttachmentImage',
  components: {
    MoreHorizontalIcon,
  },
  data() {
    return {
      modalShow: false,
    };
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
  computed: {
    /**
     * Build image URL
     */
    thumbnailUrl() {
      return `${process.env.VUE_APP_PUBLIC_BUCKET}thumbnails/${this.attachment.fileName}`;
    },

    /**
     * Full image url
     */
    imageUrl() {
      return `${process.env.VUE_APP_PUBLIC_BUCKET}${this.attachment.fileName}`;
    },

    /**
     * Create alt text for image
     */
    alt() {
      return `${this.attachment.fileName}`;
    },
  },
  methods: {
    open() {
      this.modalShow = !this.modalShow;
    },
  },
};
</script>
