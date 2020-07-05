<template>
  <div class="row">
    <div class="col-12 col-lg-7">
      <my-tasks-heading class="mb-5" @sort="sortData" @search="searchData"/>
      <my-tasks-list v-if="tasks.length" :tasks="tasks"/>

      <div v-if="!tasks.length && !loading">
        <div class="h1 mb-4">
          {{$t('tasks.no_my_tasks')}}
        </div>
        <router-link to="/create-task"><u>{{$t('tasks.create')}}</u></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import MyTasksList from '../../components/tasks/MyTasksList.vue';
import MyTasksHeading from '../../components/tasks/MyTasksHeading.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'MyTasks',
  components: {
    MyTasksHeading,
    MyTasksList,
  },
  computed: {
    tasks() {
      return this.$store.state.tasks.myTasks;
    },
    loading() {
      return this.$store.state.ui.mainLoader;
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
    async updateData() {
      this.$store.commit('ui/showLoader');
      await this.$store.dispatch('tasks/loadMyTasks', {
        sort: this.sort,
        term: this.term,
      });
      this.$store.commit('ui/hideLoader');
    },
  },
};
</script>
