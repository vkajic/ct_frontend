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
    <h2>{{task.title}}</h2>
    <div class="description">{{task.description}}
    </div>
    <div class="submition" v-if="task.status === 'waiting'">Cryptotasker has submitted solution
    </div>
    <div class="buttons">
      <div class="row">

        <div class="col-6">
          <div v-if="task.stage === 2 || task.stage === 3">
            <router-link class="btn btn-primary" :to="`taskdecision/${task.id}`">
              Decide
            </router-link>
          </div>

          <div v-if="canFinalize">
            <a class="btn btn-primary" @click="finalizeTask">Finalize</a>
          </div>

          <div v-if="task.stage === 0">
            <a class="btn btn-primary" @click="finalizeTask">Cancel</a>
          </div>
        </div>

        <div class="col-6">
          <div class="deadline">
            {{task.price}}<span class="ctf">CTF</span>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import tasksService from '../../services/tasks.service';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'MyPostedTask',
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  computed: {
    status() {
      return tasksService.getTaskStatus(this.task.stage);
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
    /**
     * TODO fix this
     * @return {boolean}
     */
    votingDone() {
      return false;
    },
    /**
     * TODO Fix this
     * @return {boolean}
     */
    solutionOver() {
      return false;
    },
    /**
     * TODO Fix this
     * @return {boolean}
     */
    decisionOver() {
      return false;
    },
    canFinalize() {
      return (this.task.stage === 4 && this.votingDone)
        || (this.task.stage === 1 && this.task.solutionOver);
    },
  },
};
</script>
