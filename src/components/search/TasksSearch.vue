<template>
  <div class="row">
    <div class="col-12 col-lg-7">
      <search-heading class="mb-5"
                      @search="search"
                      @sort="setSort"
                      @category="selectCategory"
                      :term="queryTerm"
                      :sort="sort"
                      :category="category"/>
      <tasks-group :tasks="tasks"
                   v-infinite-scroll="loadMore"
                   :infinite-scroll-disabled="lazyLoading"
                   :infinite-scroll-distance="10"/>

      <lazy-loader :visible="lazyLoading"/>

      <div class="h1 mb-4" v-if="!tasks.length && !loading">
        {{$t('tasks.no_tasks')}}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import infiniteScroll from 'vue-infinite-scroll';
import SearchHeading from './SearchHeading.vue';
import TasksGroup from './TasksGroup.vue';
import LazyLoader from '../ui/LazyLoader.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'TasksSearch',
  components: {
    LazyLoader,
    TasksGroup,
    SearchHeading,
  },
  directives: { infiniteScroll },
  data() {
    return {
      lazyLoading: false,
    };
  },
  computed: {
    ...mapState('search', {
      tasks: 'tasks',
      category: 'category',
      sort: 'sort',
      queryTerm: 'queryTerm',
    }),
    loading() {
      return this.$store.state.ui.mainLoader;
    },
    language() {
      return this.$store.state.util.activeLanguage;
    },
  },
  methods: {
    search(term) {
      this.$store.commit('search/setQueryTerm', term);
      this.runSearch();
    },
    setSort(option) {
      this.$store.commit('search/setSort', option);
      this.runSearch();
    },
    selectCategory(c) {
      this.$store.commit('search/setCategory', c);
      this.runSearch();
    },
    async runSearch() {
      this.$store.commit('ui/showLoader');
      try {
        await this.$store.dispatch('search/runSearch');
        this.$store.commit('ui/hideLoader');
      } catch (err) {
        this.$store.commit('ui/hideLoader');
        this.$store.dispatch('ui/showNotification', {
          text: err.response.data.message,
          type: 'danger',
        });
      }
    },
    async loadMore() {
      this.lazyLoading = true;
      await this.$store.dispatch('search/nextTasks');
      this.lazyLoading = false;
    },
  },
  created() {
    this.runSearch();
  },
  watch: {
    language() {
      this.runSearch();
    },
  },
};
</script>
