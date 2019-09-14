<template>
  <div>
    <div class="uploader-container image-uploader" @drop.prevent="onDragDrop" @dragover.prevent>
      <div class="uploader">
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

        <input type="file"
               :name="fileName"
               ref="file"
               @change="onFileChange($event.target.name, $event.target.files)"/>
      </div>
    </div>

    <b-form-invalid-feedback :force-show="!!error">
      {{error}}
    </b-form-invalid-feedback>
  </div>
</template>

<script>
import { ImageIcon } from 'vue-feather-icons';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ImageUploader',
  components: { ImageIcon },
  props: {
    fileName: {
      type: String,
      default: 'image',
    },
    label: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      imageUrl: null,
      maxSize: 1024,
      error: null,
      uploading: false,
    };
  },
  methods: {
    selectFile(e) {
      e.preventDefault();
      this.$refs.file.click();
    },
    onFileChange(fieldName, file) {
      const imageFile = file[0];
      this.uploadFile(fieldName, imageFile);
    },
    onDragDrop(e) {
      const imageFile = e.dataTransfer.files[0];
      this.uploadFile('avatar', imageFile);
    },

    uploadFile(fieldName, imageFile) {
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
          // Append file into FormData and turn file into image URL
          const formData = new FormData();
          this.imageUrl = URL.createObjectURL(imageFile);
          formData.append(fieldName, imageFile);
          // Emit the FormData and image URL to the parent component
          this.$emit('input', {
            formData,
            imageUrl: this.imageUrl,
          });
          this.uploading = false;
        }
      }
    },

    removeFile(e) {
      e.preventDefault();
      this.imageUrl = null;
    },
  },
};
</script>
