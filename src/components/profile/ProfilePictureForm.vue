<template>
  <div>
    <avatar-picture :picture="picture" v-b-modal.avatar :size="150"/>

    <b-modal id="avatar" title="Update your picture" @ok="save">
      <vue-avatar
        :width="200"
        :height="200"
        :rotation="rotationNum"
        :border-radius="100"
        :scale="scaleNum"
        ref="vueAvatar"
        @vue-avatar-editor:image-ready="onImageReady"/>

      <label for="scale">Zoom:</label>
      <b-form-input id="scale" type="range" v-model="scale" min="1" max="3" step="0.1"/>

      <label for="rotation">Rotate:</label>
      <b-form-input id="rotation" type="range" v-model="rotation" min="0" max="360" step="1"/>
    </b-modal>
  </div>
</template>

<script>
import { VueAvatar } from 'vue-avatar-editor-improved';
import AvatarPicture from './AvatarPicture.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ProfilePictureForm',
  components: {
    AvatarPicture,
    VueAvatar,
  },
  data() {
    return {
      scale: 1,
      rotation: 0,
    };
  },
  props: {
    picture: {
      type: String,
      default: null,
    },
  },
  methods: {
    save() {
      const img = this.$refs.vueAvatar.getImageScaled();
      this.$emit('change', img.toDataURL());
    },
    onImageReady() {
      this.scale = 1;
      this.rotation = 0;
    },
  },
  computed: {
    scaleNum() {
      return parseFloat(this.scale);
    },
    rotationNum() {
      return parseInt(this.rotation, 10);
    },
  },
};
</script>
