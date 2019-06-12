<template>
  <div class="load-more" v-if="enabled">
    <div class="row">
      <div class="col-12 text-center">
        <a class="btn btn-white" @click="loadMore">Load more</a>
      </div>
    </div>
  </div>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'SearchLoadMoreButton',
  methods: {
    loadMore() {
      //
    },
  },
  computed: {
    enabled() {
      return this.$store.getters['search/isThereMoreToLoad'];
    },
  },
};
</script>
