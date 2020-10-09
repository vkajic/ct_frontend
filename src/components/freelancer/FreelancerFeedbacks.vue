<template>
  <div>
    <lazy-loader :visible="loading"/>
    <template v-for="(f, i) in validFeedbacks">
      <div class="freelancer-feedback" :key="i">
        <p>{{ f.clientFeedback }}</p>
        <div class="d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center">
            <star-rating v-model="f.clientRate"
                         :read-only="true"
                         :star-size="15"
                         :show-rating="false"/>
            <bc-check-status checkType="freelancerFeedbacks" :feedback="f" class="ml-1"/>
          </div>
          <div class="text-muted">
            {{ f.client.name }} - {{ f.application.task.title }} -
            {{ f.createdAt | date('D.M.YYYY HH:mm') }}
          </div>
        </div>
        <hr>
      </div>
    </template>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating';
import { dateFilter } from 'vue-date-fns';
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
  filters: {
    date: dateFilter,
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
