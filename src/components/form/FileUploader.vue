<template>
  <div>
    <div class="uploader-container" @drop.prevent="onDragDrop" @dragover.prevent>
      <div class="uploader">
        <div class="text d-flex align-items-center">
          <div class="d-flex align-items-center w-100">
            <upload-icon v-if="!uploading" size="2x" class="mr-3"/>
            <b-spinner v-if="uploading" class="mr-3 text-dark"/>
            <p v-if="!fileName" class="text-center m-0">
              <a href="#" @click="selectFile"><u>{{label}}</u></a> or drag and drop file
            </p>
            <div v-if="fileName"
                 class="flex-grow-1 d-flex align-items-center justify-content-between text-dark">
              {{fileName}}
              <a href="#" @click="removeFile"><x-circle-icon size="1.5x"/></a>
            </div>
          </div>
        </div>

        <input type="file"
               :name="name"
               ref="file"
               @change="onFileChange($event.target.files)"/>
      </div>
    </div>

    <b-form-invalid-feedback :force-show="!!error">
      {{error}}
    </b-form-invalid-feedback>
  </div>
</template>

<script>
import { UploadIcon, XCircleIcon } from 'vue-feather-icons';
import ApiService from '../../services/api.service';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'FileUploader',
  components: {
    UploadIcon,
    XCircleIcon,
  },
  props: {
    name: {
      type: String,
      default: 'file',
    },
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'private',
    },
    value: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      fileUrl: null,
      fileName: null,
      maxSize: 1024, // 1MB
      error: null,
      uploading: false,
    };
  },
  methods: {
    selectFile(e) {
      e.preventDefault();
      this.$refs.file.click();
    },
    onFileChange(files) {
      const file = files[0];
      this.uploadFile(file);
    },
    onDragDrop(e) {
      const file = e.dataTransfer.files[0];
      this.uploadFile(file);
    },

    async uploadFile(file) {
      const { maxSize } = this;

      this.error = null;
      this.uploading = true;

      if (file) {
        const size = file.size / maxSize / maxSize;
        if (size > 1) {
          // check whether the size is greater than the size limit
          this.error = 'Selected file is too big.';
          this.uploading = false;
        } else {
          this.fileUrl = URL.createObjectURL(file);

          // Append file into FormData
          const formData = new FormData();
          formData.append('type', this.type);
          formData.append(this.name, file);

          // submit file to api
          const response = await ApiService.post('/files', formData, {
            headers: { 'content-type': 'multipart/form-data' },
          });

          // Emit response as file entry
          this.$emit('input', response.data.data);

          this.fileName = response.data.data.fileName;

          this.uploading = false;
        }
      }
    },

    /**
     * TODO add file removal function
     * @param e
     */
    removeFile(e) {
      e.preventDefault();
      this.$emit('remove', this.value);
      this.fileName = null;
    },
  },
  watch: {
    value(n) {
      if (n && n.fileName && !this.fileName) {
        this.fileName = n.fileName;
      }
    },
  },
  mounted() {
    if (this.value && this.value.fileName && !this.fileName) {
      this.fileName = this.value.fileName;
    }
  },
};
</script>
