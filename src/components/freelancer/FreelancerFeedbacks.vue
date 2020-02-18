<template>
  <div>
    <template v-for="(f, i) in validFeedbacks">
      <div class="freelancer-feedback" :key="i">
        <p>{{f.clientFeedback}}</p>
        <div class="d-flex align-items-center justify-content-between">
          <star-rating v-model="f.clientRate" :read-only="true" :star-size="15"/>
          <div class="text-muted">
            {{f.client.name}} - {{f.application.task.title}}
          </div>
        </div>
        <hr>
      </div>
    </template>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'FreelancerFeedbacks',
  components: {
    StarRating,
  },
  props: {
    feedbacks: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    validFeedbacks() {
      return this.feedbacks.filter(f => f.clientFeedback);
    },
  },
};
</script>
