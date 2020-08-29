<template>
  <div>
    <lazy-loader :visible="loading"/>
    <template v-for="(f, i) in validFeedbacks">
      <div class="freelancer-feedback" :key="i">
        <p>{{f.clientFeedback}}</p>
        <div class="d-flex align-items-center justify-content-between">
          <star-rating v-model="f.clientRate" :read-only="true" :star-size="15"/>
          <bc-check-status checkType="freelancerFeedbacks" :feedback="f" class="ml-2"/>
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
import apiService from '../../services/api.service';
import LazyLoader from '../ui/LazyLoader.vue';
import BcCheckStatus from '../common/BcCheckStatus.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'FreelancerFeedbacks',
  components: {
    LazyLoader,
    StarRating,
    BcCheckStatus,
  },
  props: {
    freelancerId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      feedbacks: [],
      loading: false,
    };
  },
  created() {
    this.loading = true;
    apiService.get(`/freelancers/${this.freelancerId}/feedbacks`)
      .then((res) => {
        this.feedbacks = res.data.data;
        this.loading = false;
      });
  },
  computed: {
    validFeedbacks() {
      return this.feedbacks.filter(f => f.clientFeedback);
    },
  },
};
</script>
