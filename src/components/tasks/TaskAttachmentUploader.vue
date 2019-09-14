<template>
  <div>
    <b-button variant="primary" @click="openUploader">Upload attachments</b-button>
    <ul v-if="files.length" class="mt-3 mb-3">
      <li v-for="(file, i) in files" :key="file.id">
        <span class="pr-2">{{file.fileName}}</span>
        <b-button variant="link" @click="deleteFile(file, i)" class="p-0">
          <font-awesome-icon icon="trash"/>
        </b-button>
      </li>
    </ul>
    <file-uploader @attach="attach"/>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import FileUploader from '../FileUploader.vue';
import UtilService from '../../services/util.service';

library.add(faTrash);

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'TaskAttachmentUploader',
  components: {
    FileUploader,
    FontAwesomeIcon,
  },
  props: {
    attachments: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      files: [],
    };
  },
  methods: {
    /**
     * Open uploader
     */
    openUploader() {
      this.$store.commit('ui/openFileUploader', 'task');
    },

    /**
     * Attach files to data prop to display them
     * @param {Array} files
     */
    attach(files) {
      this.files.push(...files);
      this.$emit('attach', this.files);
    },

    /**
     * Delete file attachment
     * @param {Object} file
     * @param {Number} index
     * @return {Promise<void>}
     */
    async deleteFile(file, index) {
      await UtilService.deleteFile(file.id, 'task');
      this.files.splice(index, 1);
      this.$emit('attach', this.files);
    },
  },
  mounted() {
    this.files = [...this.attachments];
  },
  watch: {
    attachments(n) {
      this.files = [...n];
    },
  },
};
</script>
