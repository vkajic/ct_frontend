<template>
  <div>
    <div class="uploader-container image-uploader mb-2"
         @drop.prevent="onDragDrop"
         @dragover.prevent>
      <div class="uploader h-100">
        <template v-if="!uploading">
          <div v-if="!imageUrl"
               class="text d-flex flex-column justify-content-center align-items-center">
            <image-icon v-if="!uploading" size="4x"/>
            <b-spinner v-if="uploading" class="text-dark" large/>
            <p class="text-center">
              <a href="#" @click="selectFile"><u>{{label}}</u></a> or drag and drop file
            </p>
          </div>

          <div v-if="imageUrl"
               class="text image"
               :style="{'background-image': `url(${imageUrl})`}">
            <div class="overlay flex-column align-items-center justify-content-center">
              <image-icon v-if="!uploading" size="4x"/>
              <p class="text-center">
                <a href="#" @click="selectFile" class="text-white"><u>Update</u></a> or
                <a href="#" @click="removeFile" class="text-white"><u>Remove</u></a> image
              </p>
            </div>
          </div>

        </template>
        <template v-else>
          <div class="h-100 d-flex flex-column align-items-center justify-content-center">
            <div>uploading...</div>
            <h3>{{uploadPercentage}}%</h3>
          </div>
        </template>

        <input type="file"
               :name="fileName"
               ref="file"
               :disabled="uploading"
               @change="onFileChange($event.target.files)"/>
      </div>
    </div>

    <b-form-invalid-feedback :force-show="!!error">
      {{error}}
    </b-form-invalid-feedback>

    <validation-messages v-if="validation" :title="title" :validation="validation"/>
  </div>
</template>

<script>
import { ImageIcon } from 'vue-feather-icons';
import ApiService from '../../services/api.service';
import ValidationMessages from './ValidationMessages.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ImageUploader',
  components: {
    ValidationMessages,
    ImageIcon,
  },
  props: {
    value: {
      type: Object,
      default: null,
    },
    fileName: {
      type: String,
      default: 'file',
    },
    label: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'public',
    },
    validation: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      imageUrl: null,
      maxSize: process.env.VUE_APP_FILESIZE_LIMIT,
      error: null,
      uploading: false,
      uploadPercentage: 0,
    };
  },
  methods: {
    selectFile(e) {
      e.preventDefault();
      this.$refs.file.click();
    },
    onFileChange(file) {
      const imageFile = file[0];
      this.uploadFile(imageFile);
    },
    onDragDrop(e) {
      const imageFile = e.dataTransfer.files[0];
      this.uploadFile(imageFile);
    },

    async uploadFile(imageFile) {
      const { maxSize } = this;

      this.error = null;
      this.uploading = true;

      if (imageFile) {
        const size = imageFile.size / maxSize / maxSize;
        if (!imageFile.type.match('image.*')) {
          // check whether the upload is an image
          this.error = 'Selected file is not image.';
          this.uploading = false;
        } else if (size > 1) {
          // check whether the size is greater than the size limit
          this.error = 'Selected image is too big.';
          this.uploading = false;
        } else {
          // this.imageUrl = URL.createObjectURL(imageFile);

          // Append file into FormData and turn file into image URL
          const formData = new FormData();
          formData.append('type', this.type);
          formData.append(this.fileName, imageFile);

          // submit file to api
          const response = await ApiService.post('/files', formData, {
            headers: { 'content-type': 'multipart/form-data' },
            onUploadProgress: (progressEvent) => {
              const percentage = (progressEvent.loaded / progressEvent.total) * 100;
              this.uploadPercentage = Math.round(percentage);
            },
          });

          // Emit response as file entry
          this.$emit('input', response.data.data);

          this.uploading = false;
          this.uploadPercentage = 0;
        }
      }
    },

    removeFile(e) {
      e.preventDefault();
      this.imageUrl = null;
      this.$emit('remove');
    },
  },
  watch: {
    value(n) {
      if (n) {
        const imageRequest = JSON.stringify({
          bucket: process.env.VUE_APP_PUBLIC_BUCKET,
          key: n.fileName,
          edits: this.options,
        });
        this.imageUrl = `${process.env.VUE_APP_IMAGE_BASE_URL}/${btoa(imageRequest)}`;
      }
    },
  },
  mounted() {
    if (this.value && this.value.fileName) {
      const imageRequest = JSON.stringify({
        bucket: process.env.VUE_APP_PUBLIC_BUCKET,
        key: this.value.fileName,
        edits: this.options,
      });
      this.imageUrl = `${process.env.VUE_APP_IMAGE_BASE_URL}/${btoa(imageRequest)}`;
    }
  },
};
</script>
