<template>
  <div>
    <search-heading class="mb-5" @search="search" @sort="sort" @category="selectCategory"/>
    <tasks-group :tasks="tasks"/>
  </div>
</template>

<script>
import SearchHeading from './SearchHeading.vue';
import TasksGroup from './TasksGroup.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'TasksSearch',
  components: {
    TasksGroup,
    SearchHeading,
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
        this.$store.dispatch('ui/showNotification', {
          text: err.response.data.message,
          type: 'danger',
        });
      }
    },
    async sort(option) {
      try {
        await this.$store.dispatch('search/changeSort', option.by);
      } catch (err) {
        this.$store.dispatch('ui/showNotification', {
          text: err.response.data.message,
          type: 'danger',
        });
      }
    },
    async selectCategory() {
      //
    },
  },
  created() {
    this.$store.dispatch('search/runSearch')
      .catch((err) => {
        this.$store.dispatch('ui/showNotification', {
          text: err.response.data.message,
          type: 'danger',
        });
      });
  },
};
</script>
