<template>
  <div class="freelancers">
    <freelancers-search-item class="mb-4"
                             v-for="f in freelancers"
                             :key="f.id"
                             :freelancer="f._source"
                             :id="f._id"
                             :skills="f._source.skills"/>
  </div>
</template>

<script>
import FreelancersSearchItem from './FreelancersSearchItem.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'FreelancersSearchList',
  components: { FreelancersSearchItem },
  props: {
    freelancers: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
