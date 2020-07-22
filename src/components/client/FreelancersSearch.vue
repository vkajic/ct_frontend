<template>
  <div class="row">
    <div class="col-12 col-lg-7">
      <freelancers-search-heading @search="search"
                                  @category="selectCategory"
                                  @skill="selectSkill"
                                  :term="term"
                                  :category="category"
                                  :skill="skill"
                                  class="mb-5"/>
      <freelancers-search-list :freelancers="freelancers"
                               v-infinite-scroll="loadMore"
                               :infinite-scroll-disabled="lazyLoading"
                               :infinite-scroll-distance="10"/>

      <lazy-loader :visible="lazyLoading"/>

      <div class="h1 mb-4" v-if="!freelancers.length && !loading">
        {{$t('freelancers_search.nothing')}}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import infiniteScroll from 'vue-infinite-scroll';
import FreelancersSearchList from './FreelancersSearchList.vue';
import FreelancersSearchHeading from './FreelancersSearchHeading.vue';
import LazyLoader from '../ui/LazyLoader.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'FreelancersSearch',
  components: {
    LazyLoader,
    FreelancersSearchHeading,
    FreelancersSearchList,
  },
  directives: { infiniteScroll },
  data() {
    return {
      lazyLoading: false,
    };
  },
  created() {
    this.$store.commit('ui/showLoader');
    this.$store.dispatch('freelancers/getFreelancers')
      .then(() => {
        this.$store.commit('ui/hideLoader');
      });
  },
  computed: {
    ...mapState('freelancers', {
      freelancers: 'freelancers',
      term: 'term',
      category: 'category',
      skill: 'skill',
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
      this.$store.commit('freelancers/setSearchTerm', term);
      this.runSearch();
    },
    selectCategory(category) {
      // save old selection for comparison later on
      const oldCategory = this.category;
      this.$store.commit('freelancers/setCategory', category);

      // if category changed then reset selected skill
      if (category !== oldCategory) {
        this.$store.commit('freelancers/setSkill', null);
      }

      this.runSearch();
    },
    selectSkill(skill) {
      this.$store.commit('freelancers/setSkill', skill);
      this.runSearch();
    },
    async runSearch() {
      this.$store.commit('ui/showLoader');
      this.$store.commit('freelancers/resetPage');
      await this.$store.dispatch('freelancers/getFreelancers');
      this.$store.commit('ui/hideLoader');
    },
    async loadMore() {
      this.lazyLoading = true;
      await this.$store.dispatch('freelancers/nextFreelancers');
      this.lazyLoading = false;
    },
  },
  watch: {
    language() {
      this.runSearch();
    },
  },
};
</script>
