<template>
  <div>
    <div class="uploader-container" @drop.prevent="onDragDrop" @dragover.prevent>
      <div class="uploader">
        <div class="text d-flex align-items-center">
          <div class="d-flex align-items-center">
            <upload-icon v-if="!uploading" size="2x" class="mr-3"/>
            <b-spinner v-if="uploading" class="mr-3 text-dark"/>
            <p v-if="!uploading" class="text-center m-0">
              <a href="#" @click="selectFile"><u>{{label}}</u></a> or drag and drop files
            </p>
            <p v-if="uploading" class="text-center m-0 text-dark">Uploading...</p>
          </div>
        </div>

        <input type="file"
               :name="`${name}[]`"
               ref="file"
               multiple
               @change="onFileChange"/>
      </div>
    </div>

    <b-form-invalid-feedback v-for="(error, index) in errors" :key="index" :force-show="true">
      {{error}}
    </b-form-invalid-feedback>

    <div class="row pt-3">
      <div class="col-4 col-xxxl-3" v-for="(img, i) in fileUrls" :key="i">
        <div class="uploader-gallery-image" :style="{'background-image': `url(${img})`}">
          <div class="remove">
            <a href="#" @click="removeImage($event, i)" class="text-white"><u>Remove</u></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { UploadIcon } from 'vue-feather-icons';
import ApiService from '../../services/api.service';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'GalleryUploader',
  components: {
    UploadIcon,
  },
  props: {
    value: {
      type: Array,
      default() {
        return [];
      },
    },
    name: {
      type: String,
      default: 'files',
    },
    label: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      default() {
        return [];
      },
    },
    type: {
      type: String,
      default: 'public',
    },
  },
  data() {
    return {
      fileUrls: [],
      fileName: null,
      maxSize: process.env.VUE_APP_FILESIZE_LIMIT, // 10MB
      errors: [],
      uploading: false,
    };
  },
  methods: {
    selectFile(e) {
      e.preventDefault();
      this.$refs.file.click();
    },
    onFileChange(e) {
      this.uploadFiles(e.target.files);
    },

    onDragDrop(e) {
      this.uploadFiles(e.dataTransfer.files);
    },

    async uploadFiles(files) {
      const { maxSize } = this;

      this.errors = [];
      this.uploading = true;

      if (files.length) {
        const formData = new FormData();
        formData.append('type', this.type);

        Array.from(files)
          .forEach((f) => {
            const size = f.size / maxSize / maxSize;

            if (size > 1) {
              // check whether the size is greater than the size limit
              this.errors.push(`Selected image ${f.name} is too big.`);
            } else {
              // Append file into FormData and turn file into image URL
              this.fileUrls.push(URL.createObjectURL(f));

              formData.append(this.name, f);
            }
          });

        // submit file to api
        const response = await ApiService.post('/files/multiple', formData, {
          headers: { 'content-type': 'multipart/form-data' },
        });

        // Emit response as file entry
        this.$emit('input', response.data.data);

        this.uploading = false;
      }
    },
    removeImage(e, index) {
      e.preventDefault();
      this.fileUrls.splice(index, 1);
    },
  },
  watch: {
    value(n) {
      if (n && n.length && !this.fileUrls.length) {
        this.fileUrls = n.map((i) => {
          if (i.permissions === 'public') {
            return process.env.VUE_APP_PUBLIC_BUCKET + i.fileName;
          }

          // TODO fetch signed url
          return i.fileName;
        });
      }
    },
  },
  mounted() {
    if (this.value && this.value.length && !this.fileUrls.length) {
      this.fileUrls = this.value.map((i) => {
        if (i.permissions === 'public') {
          return process.env.VUE_APP_PUBLIC_BUCKET + i.fileName;
        }

        // TODO fetch signed url
        return i.fileName;
      });
    }
  },
};
</script>
