<template>
  <div v-if="count > 0" class="d-flex flex-column align-items-center">
    <star-rating v-model="rate" :read-only="true" :star-size="20" class="mb-2"
                 :show-rating="false"/>
    <h2>{{rate}}/{{count}}</h2>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating';
import apiService from '../../services/api.service';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ClientRate',
  components: {
    StarRating,
  },
  data() {
    return {
      rate: 0,
      count: 0,
    };
  },
  props: {
    clientId: {
      type: Number,
      required: true,
    },
  },
  created() {
    apiService.get(`/clients/${this.clientId}/rate`)
      .then((res) => {
        const { rate, count } = res.data.data;
        this.rate = rate;
        this.count = count;
      });
  },
};
</script>

<style scoped>

</style>
