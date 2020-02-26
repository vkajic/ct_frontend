<template>
  <div>
    <lazy-loader :visible="loading"/>
    <client-tasks-list-item v-for="t in tasks" :key="t.id" :task="t"/>
  </div>
</template>

<script>
import ClientTasksListItem from './ClientTasksListItem.vue';
import apiService from '../../services/api.service';
import LazyLoader from '../ui/LazyLoader.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ClientTasksList',
  components: { LazyLoader, ClientTasksListItem },
  props: {
    clientId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      tasks: [],
      loading: false,
    };
  },
  created() {
    this.loading = true;
    apiService.get(`/clients/${this.clientId}/tasks`)
      .then((res) => {
        this.tasks = res.data.data;
        this.loading = false;
      });
  },
};
</script>
