<template>
  <div class="row">
    <div class="col-3">
      <freelancer-menu/>
    </div>
    <div class="col-6">
      <search-heading class="mb-5"/>

      <tasks-group/>
    </div>
  </div>
</template>

<script>
import FreelancerMenu from '../components/FreelancerMenu.vue';
import SearchHeading from '../components/search/SearchHeading.vue';
import ShortTaskItem from '../components/tasks/ShortTaskItem.vue';
import TasksGroup from '../components/search/TasksGroup.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Search',
  components: {
    TasksGroup,
    ShortTaskItem,
    SearchHeading,
    FreelancerMenu,
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
  },
  created() {
    /* this.$store.dispatch('search/runSearch')
      .catch((err) => {
        this.$store.dispatch('ui/showNotification', {
          text: err.response.data.message,
          type: 'danger',
        });
      }); */
  },
};
</script>
