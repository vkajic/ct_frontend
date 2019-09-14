<template>
  <div>
    <div class="uploader-container" @drop.prevent="onDragDrop" @dragover.prevent>
      <div class="uploader">
        <div class="text d-flex align-items-center">
          <div class="d-flex align-items-center">
            <upload-icon v-if="!uploading" size="2x" class="mr-3"/>
            <b-spinner v-if="uploading" class="mr-3 text-dark"/>
            <p v-if="!fileName" class="text-center m-0">
              <a href="#" @click="selectFile"><u>{{label}}</u></a> or drag and drop file
            </p>
            <p v-if="fileName" class="text-center m-0 text-dark">{{fileName}}</p>
          </div>
        </div>

        <input type="file"
               :name="name"
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
import { UploadIcon } from 'vue-feather-icons';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'FileUploader',
  components: {
    UploadIcon,
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
  },
  data() {
    return {
      fileUrl: null,
      fileName: null,
      maxSize: 1024, // 10MB
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
      const resumeFile = file[0];
      this.uploadFile(fieldName, resumeFile);
    },
    onDragDrop(e) {
      const resumeFile = e.dataTransfer.files[0];
      this.uploadFile('resume', resumeFile);
    },

    uploadFile(fieldName, resumeFile) {
      const { maxSize } = this;

      this.error = null;
      this.uploading = true;

      if (resumeFile) {
        const size = resumeFile.size / maxSize / maxSize;
        if (size > 1) {
          // check whether the size is greater than the size limit
          this.error = 'Selected file is too big.';
          this.uploading = false;
        } else {
          // Append file into FormData and turn file into image URL
          const formData = new FormData();
          this.fileUrl = URL.createObjectURL(resumeFile);
          this.fileName = resumeFile.name;
          formData.append(fieldName, resumeFile);
          // Emit the FormData and image URL to the parent component
          this.$emit('input', {
            formData,
            fileUrl: this.fileUrl,
          });

          this.uploading = false;
        }
      }
    },
  },
};
</script>
