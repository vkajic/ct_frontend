<template>
  <div class="container task">
    <div class="row">
      <div class="col-md-2">
        <back-button/>
      </div>
      <div class="col-md-8 center">
        <h1>Task Detail</h1>
      </div>
      <div class="col-md-2"></div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="block">
          <div class="upper">
            <div class="row">
              <div class="col-8">
                <h2>
                  {{item.title}}
                  <small v-if="canEdit">
                    <router-link :to="'/edit-task/' + item.id">Edit</router-link>
                  </small>
                </h2>
              </div>
              <div class="col-4 text-right">
                <div class="deadline">
                  {{item.price}}<span class="ctf">ctf</span>
                </div>
              </div>
            </div>
          </div>
          <task-details :item="item" :applications="applications"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import BackButton from '../components/BackButton.vue';
import TaskDetails from '../components/tasks/TaskDetails.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Task',
  components: {
    TaskDetails,
    BackButton,
  },
  computed: {
    ...mapState('tasks', {
      item: state => state.selectedTask,
      applications: state => state.selectedTaskApplications,
    }),
    user() {
      return this.$store.state.user.user;
    },
    canEdit() {
      return this.user && this.user.id === this.item.postedBy && !this.item.published;
    },
  },
  created() {
    const { id } = this.$route.params;

    this.$store.dispatch('tasks/selectTask', id);
  },
};
</script>
