<template>
  <div class="application-feedback" v-if="feedback.freelancerRate">
    <star-rating v-model="feedback.freelancerRate" :read-only="true" :star-size="20" class="mb-4"/>
    <p class="px-2">{{feedback.freelancerFeedback}}</p>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ApplicationFeedback',
  components: {
    StarRating,
  },
  props: {
    feedback: {
      type: Object,
      required: true,
    },
  },
};
</script>
