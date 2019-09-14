<template>
  <div class="block">
    <div class="upper">
      <div class="row">
        <div class="col-8">{{task.status}}
        </div>
        <div class="col-4 text-right">
          <img src="@/assets/img/waiting_blue.svg" v-if="taskClass === 'waiting'">
          <img src="@/assets/img/accept.svg" v-if="taskClass === 'finished'">
          <img src="@/assets/img/remove.svg" v-if="taskClass === 'rejected'">
        </div>
      </div>
    </div>
    <h2><router-link :to="`/task/${task.id}`">{{task.title}}</router-link></h2>
    <div class="description">
      {{task.description}}
    </div>
    <div v-if="task.stage === 1">
      <div class="deadline">
        {{calculateRemainingDays}}
      </div>
      <div class="deadlinedesc">
        to finish this task or you will <span>lose your work fee</span>
      </div>
    </div>
    <div class="buttons">

      <div class="row">
        <div class="col-6">
          <div v-if="task.stage === 1">
            <router-link class="btn btn-blue" :to="'taskdetail/'+task.id+'/yes'">
              Submit solution
            </router-link>
          </div>

          <div
            v-if="canFinalize">
            <a class="btn btn-primary" v-on:click="finalizeTask(task.id)">Finalize</a>
          </div>
        </div>

        <div class="col-6">
          <div class="deadline">
            {{task.price}}<span class="ctf">CTF</span>
          </div>
        </div>

      </div>

    </div>

    <div class="deadlinedesc" v-if="task.stage === 2">
      Waiting for client decision
    </div>

  </div>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'TaskWorkingOn',
  props: {
    task: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    votingDone() {
      return false;
    },
    decisionOver() {
      return false;
    },
    calculateRemainingDays() {
      const now = new Date().getTime();
      const applicationDate = new Date(this.task.Applications[0].createdAt).getTime();
      const num = Math.round(this.task.worktime - (now / 1000 - applicationDate) / 3600 / 24);

      return num < 1 ? '0 days' : `${num} days`;
    },
    canFinalize() {
      return (this.task.stage === 4 && this.votingDone)
        || ((this.task.stage === 2 || this.task.stage === 3) && this.decisionOver);
    },
    taskClass() {
      let cls;

      switch (this.task.stage) {
        case 1:
        case 2:
        case 4:
          cls = 'waiting';
          break;
        case 5:
        case 7:
        case 9:
          cls = 'gray';
          break;
        case 6:
        case 10:
          cls = 'finished';
          break;
        case 8:
          cls = 'rejected';
          break;
        default:
          cls = '';
      }

      return cls;
    },
  },
  methods: {
    finalizeTask() {
      //
    },
  },
};
</script>
