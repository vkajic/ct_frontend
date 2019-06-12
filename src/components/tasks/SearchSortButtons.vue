<template>
  <div class="col-filter">
    <h3 class="blue">
      <span class="gray italic">Sort by</span>

      <a class="item"
         v-for="option in options"
         :key="option.by"
         :class="{'active': currentSort.by === option.by}"
         @click="sortBy(option)">
        {{option.label}}
        <img src="@/assets/img/up.svg" alt="Sort ASC"
             v-if="currentSort.by === option.by && currentSort.dir === 'asc'"/>
        <img src="@/assets/img/up.svg" alt="Sort DESC" class="flip"
             v-if="currentSort.by === option.by && currentSort.dir === 'desc'"/>
      </a>
    </h3>
  </div>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'SearchSortButtons',
  data() {
    return {
      options: [
        {
          by: 'timePosted',
          label: 'Time Posted',
        },
        {
          by: 'price',
          label: 'Value',
        },
        {
          by: 'worktime',
          label: 'Work Time',
        },
      ],
    };
  },
  computed: {
    currentSort() {
      return this.$store.state.search.sort;
    },
  },
  methods: {
    /**
     * Update sort property
     * @param option
     */
    sortBy(option) {
      this.$emit('sort', option);
    },
  },
};
</script>

<style scoped>
  a {
    cursor: pointer;
  }

  .flip {
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);
  }
</style>
