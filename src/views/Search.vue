<template>
  <div class="task">
    <div class="row">
      <div class="col-md-2">
        <back-button/>
      </div>
      <div class="col-md-8 center">
        <h1>Find work</h1>
      </div>
      <div class="col-md-2"></div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="col-title text-center">
          <h3 class="blue">Project list</h3>
        </div>
        <search-query-term @search="search" class="mb-3"/>
        <search-sort-buttons @sort="sort"/>
        <search-tasks-list :tasks="tasks"/>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSortButtons from '../components/tasks/SearchSortButtons.vue';
import BackButton from '../components/BackButton.vue';
import SearchTasksList from '../components/tasks/SearchTasksList.vue';
import SearchQueryTerm from '../components/tasks/SearchQueryTerm.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Search',
  components: {
    SearchQueryTerm,
    SearchTasksList,
    BackButton,
    SearchSortButtons,
  },
  computed: {
    tasks() {
      return this.$store.state.search.tasks;
    },
  },
  methods: {
    async search(term) {
      try {
        await this.$store.dispatch('search/runSearch', term);
      } catch (err) {
        this.$store.commit('ui/showNotification', {
          text: err.response.data.message,
          type: 'danger',
        });
      }
    },
    async sort(option) {
      try {
        await this.$store.dispatch('search/changeSort', option.by);
      } catch (err) {
        this.$store.commit('ui/showNotification', {
          text: err.response.data.message,
          type: 'danger',
        });
      }
    },
  },
  created() {
    this.$store.dispatch('search/runSearch')
      .catch((err) => {
        this.$store.commit('ui/showNotification', {
          text: err.response.data.message,
          type: 'danger',
        });
      });
  },
};
</script>
