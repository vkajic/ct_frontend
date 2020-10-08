<template>
  <div>
    <div class="row">
      <div class="col-12 col-lg-7">
        <single-task-title :task="task" :client="task.owner"/>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-lg-3 offset-lg-1 order-lg-2">
        <task-details :task="task">
          <template slot="buttons">
            <freelancer-task-buttons @apply="apply"
                                     :application="freelancerApplication"
                                     :task="task"/>
          </template>
        </task-details>
        <required-skills class="p-4 m-2" :skills="task.skills" v-if="task.skills"/>
      </div>
      <div class="col-12 col-lg-7 order-lg-1">
        <task-description class="pt-3 pt-lg-0" :description="task.description"/>
      </div>
    </div>
  </div>
</template>

<script>
import TaskDetails from '../../components/tasks/TaskDetails.vue';
import RequiredSkills from '../../components/tasks/RequiredSkills.vue';
import SingleTaskTitle from '../../components/tasks/SingleTaskTitle.vue';
import FreelancerTaskButtons from '../../components/tasks/FreelancerTaskButtons.vue';
import TaskDescription from '../../components/tasks/TaskDescription.vue';
import languageRouter from '../../components/mixins/languageRouter';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Task',
  components: {
    TaskDescription,
    FreelancerTaskButtons,
    SingleTaskTitle,
    RequiredSkills,
    TaskDetails,
  },
  mixins: [languageRouter],
  mounted() {
    const { id } = this.$route.params;
    this.selectTask(id);
  },
  computed: {
    task() {
      return this.$store.state.tasks.selectedTask || {};
    },
    applications() {
      return this.$store.state.tasks.selectedTaskApplications || [];
    },
    freelancerApplication() {
      return this.applications.length ? this.applications[0] : null;
    },
  },
  methods: {
    async selectTask(id) {
      try {
        await this.$store.dispatch('tasks/selectTask', id);
      } catch (e) {
        if (e.response && e.response.status === 404) {
          await this.replace({ name: 'notFoundPage' });
        }
      }
    },
    async apply(letter) {
      try {
        const application = await this.$store.dispatch('tasks/applyForTask', {
          taskId: this.task.id,
          letter,
          taskBcId: this.task.bcId,
        });
        // add new thread from new application
        this.$store.commit('chat/addThread', application);

        // emit to socket that freelancer applied to task
        this.$socket.emit('applied', application);

        // show toast
        await this.$store.dispatch('ui/showNotification', {
          type: 'success',
          text: this.$t('freelancers.apply_success'),
        });
        await this.push(`/applications/${application.id}`);
        this.applied = true;
        this.letter = null;
      } catch (err) {
        await this.$store.dispatch('ui/showNotification', {
          type: 'danger',
          text: err.response.data.message,
        });
      }
    },
  },
  metaInfo() {
    return {
      title: this.task ? this.task.title : '',
    };
  },
};
</script>
