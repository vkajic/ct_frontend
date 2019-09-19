<template>
  <div class="row">
    <div class="col-3 pt-5">
      <left-menu/>
    </div>
    <div class="col-6">
      <div v-if="activeRole === 'freelancer'">
        <tasks-search/>
      </div>
      <div v-if="activeRole === 'client'"></div>
    </div>
  </div>
</template>

<script>
import LeftMenu from '../components/layout/LeftMenu.vue';
import TasksSearch from '../components/search/TasksSearch.vue';

export default {
  name: 'home',
  components: {
    TasksSearch,
    LeftMenu,
  },
  computed: {
    activeRole() {
      return this.$store.state.user.activeRole;
    },
  },
};
</script>
