<template>
  <div>
    <lazy-loader :visible="loading"/>
    <template v-for="(f, i) in validFeedbacks">
      <div class="client-feedback" :key="i">
        <p>{{ f.freelancerFeedback }}</p>
        <div class="d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center">
            <star-rating v-model="f.freelancerRate"
                         :read-only="true"
                         :star-size="15"
                         :show-rating="false"/>
            <bc-check-status checkType="clientFeedbacks" :feedback="f" class="ml-1"/>
          </div>
          <div class="text-muted">
            {{ f.freelancer.name }} - {{ f.application.task.title }} -
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
  name: 'ClientFeedbacks',
  components: {
    LazyLoader,
    StarRating,
    BcCheckStatus,
  },
  filters: {
    date: dateFilter,
  },
  props: {
    clientId: {
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
    apiService.get(`/clients/${this.clientId}/feedbacks`)
      .then((res) => {
        this.feedbacks = res.data.data;
        this.loading = false;
      });
  },
  computed: {
    validFeedbacks() {
      return this.feedbacks.filter(f => f.freelancerFeedback);
    },
  },
};
</script>
