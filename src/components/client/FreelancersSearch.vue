<template>
  <page-wrapper>
    <freelancers-search-heading @search="search"
                                @category="selectCategory"
                                :term="term"
                                :category="category"
                                class="mb-5"/>
    <freelancers-search-list :freelancers="freelancers"
                             v-infinite-scroll="loadMore"
                             :infinite-scroll-disabled="lazyLoading"
                             :infinite-scroll-distance="10"/>

    <lazy-loader :visible="lazyLoading"/>

    <div class="h1 mb-4" v-if="!freelancers.length && !loading">
      No freelancers available...
    </div>
  </page-wrapper>
</template>

<script>
import { mapState } from 'vuex';
import infiniteScroll from 'vue-infinite-scroll';
import FreelancersSearchList from './FreelancersSearchList.vue';
import FreelancersSearchHeading from './FreelancersSearchHeading.vue';
import LazyLoader from '../ui/LazyLoader.vue';
import PageWrapper from '../ui/PageWrapper.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'FreelancersSearch',
  components: {
    PageWrapper,
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
    }),
    loading() {
      return this.$store.state.ui.mainLoader;
    },
  },
  methods: {
    async search(term) {
      this.$store.commit('ui/showLoader');
      this.$store.commit('freelancers/resetPage');
      this.$store.commit('freelancers/setSearchTerm', term);
      await this.$store.dispatch('freelancers/getFreelancers');
      this.$store.commit('ui/hideLoader');
    },
    async selectCategory(category) {
      this.$store.commit('ui/showLoader');
      this.$store.commit('freelancers/resetPage');
      this.$store.commit('freelancers/setCategory', category);
      await this.$store.dispatch('freelancers/getFreelancers');
      this.$store.commit('ui/hideLoader');
    },
    async loadMore() {
      this.lazyLoading = true;
      await this.$store.dispatch('freelancers/nextFreelancers');
      this.lazyLoading = false;
    },
  },
};
</script>
