<template>
  <div>
    <div class="image-info d-flex align-items-center justify-content-between">
      <div>{{attachment.fileName}}</div>
      <b-dropdown size="sm" variant="link" toggle-class="text-decoration-none" no-caret
                  v-if="owner">
        <template slot="button-content">
          <more-horizontal-icon size="1.5x"/>
        </template>
        <b-dropdown-item href="#" @click="$emit('delete', attachment)">
          {{$t('common.delete')}}
        </b-dropdown-item>
      </b-dropdown>
    </div>
    <a href="#" @click.prevent="open" class="image-attachment">
      <image-display :options="thumbnailOptions"
                     :file="attachment"
                     class="thumbnail img-fluid"
                     :alt="alt"/>
    </a>
    <b-modal v-model="modalShow" :hide-footer="true" :title="attachment.fileName">
      <div class="d-flex justify-content-center">
        <image-display :file="attachment"
                       class="img-fluid"
                       :alt="alt"/>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { MoreHorizontalIcon } from 'vue-feather-icons';
import ImageDisplay from '../../ui/ImageDisplay.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ChatAttachmentImage',
  components: {
    ImageDisplay,
    MoreHorizontalIcon,
  },
  data() {
    return {
      modalShow: false,
      thumbnailOptions: {
        resize: {
          width: 400,
        },
      },
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
