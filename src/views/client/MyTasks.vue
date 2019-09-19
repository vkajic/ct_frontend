<template>
  <div class="row">
    <div class="col-3 pt-5">
      <left-menu/>
    </div>
    <div class="col-6">
      <my-tasks-heading class="mb-5" @sort="sortData" @search="searchData"/>
      <my-tasks-list v-if="tasks.length" :tasks="tasks"/>

      <div v-if="!tasks.length">
        <div class="h1 mb-4">
          You have no tasks atm...
        </div>
        <router-link to="/create-task"><u>Create</u></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import MyTasksList from '../../components/tasks/MyTasksList.vue';
import MyTasksHeading from '../../components/tasks/MyTasksHeading.vue';
import LeftMenu from '../../components/layout/LeftMenu.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'MyTasks',
  components: {
    LeftMenu,
    MyTasksHeading,
    MyTasksList,
  },
  computed: {
    tasks() {
      return this.$store.state.tasks.myTasks;
    },
  },
  data() {
    return {
      sort: null,
      term: null,
    };
  },
  mounted() {
    this.updateData();
  },
  methods: {
    sortData(e) {
      this.sort = e;
      this.updateData();
    },
    searchData(e) {
      this.term = e;
      this.updateData();
    },
    updateData() {
      this.$store.dispatch('tasks/loadMyTasks', {
        sort: this.sort,
        term: this.term,
      });
    },
  },
};
</script>
