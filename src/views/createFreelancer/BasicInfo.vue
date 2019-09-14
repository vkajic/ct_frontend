<template>
  <funnel-container>
    <div class="row">
      <div class="col-4">
        <image-uploader label="Add profile image"/>
      </div>
      <div class="col-8">
        <basic-info-form/>
      </div>
    </div>
  </funnel-container>
</template>

<script>
import FunnelContainer from '../../components/profile/FunnelContainer.vue';
import BasicInfoForm from '../../components/profile/BasicInfoForm.vue';
import ImageUploader from '../../components/form/ImageUploader.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'BasicInfo',
  components: {
    ImageUploader,
    BasicInfoForm,
    FunnelContainer,
  },
};
</script>
