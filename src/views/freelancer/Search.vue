<template>
  <div class="row">
    <div class="col-3 pt-5">
      <left-menu/>
    </div>
    <div class="col-6">
      <tasks-search/>
    </div>
  </div>
</template>

<script>
import LeftMenu from '../../components/layout/LeftMenu.vue';
import TasksSearch from '../../components/search/TasksSearch.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Search',
  components: {
    TasksSearch,
    LeftMenu,
  },
};
</script>
