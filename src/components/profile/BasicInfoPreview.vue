<template>
  <div class="row">
    <div class="col-4">
      <avatar-display class="mb-4"/>
      <a href="#" class="d-block "><u>
        <small>www.kendal.design</small>
      </u></a>
    </div>
    <div class="col-8">
      <h1>Kendal Noboa</h1>
      <h6 class="mb-4 font-weight-normal">
        JavaScript Developer in São Paulo, Brasil — Contract, Part time
      </h6>

      <p class="mb-4 lead">Kendal is a senior front-end web developer with over 15
        years of experience at companies like Starbucks, Rosetta Stone,
        and Livemocha. She specializes in building front-ends for JavaScript
        web applications and has a deep expertise in the nuances of
        cross-platform development.</p>

      <tags-display :tags="tags" class="mb-5"/>

      <b-button variant="info" class="btn-round">Publish profile</b-button>
    </div>
  </div>
</template>

<script>
import TagsDisplay from '../ui/TagsDisplay.vue';
import AvatarDisplay from '../ui/AvatarDisplay.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'BasicInfoPreview',
  components: {
    AvatarDisplay,
    TagsDisplay,
  },
  data() {
    return {
      tags: [
        { name: 'Vue.js' },
        { name: 'Node.js' },
        { name: 'PHP' },
        { name: 'Laravel' },
      ],
    };
  },
};
</script>
