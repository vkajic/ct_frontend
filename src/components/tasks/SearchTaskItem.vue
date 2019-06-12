<template>
  <div :class="status" class="block">
    <div class="upper">
      <div class="row">
        <div class="col-md-9">
          <div class="row">
            <div class="col-12">
              <h2>{{data.title}}</h2>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <!-- label>Posted</label>
              {{calculateDays(data.timestamp)}} -->
            </div>
            <div class="col-6">
              <label>Worktime</label>
              {{data.worktime}} day(s)
            </div>
          </div>
        </div>
        <div class="col-md-3 text-right">
          <div class="deadline">
            {{data.price}}<span class="ctf">ctf</span>
          </div>
        </div>
      </div>
    </div>
    <div class="desc-container">
      <div class="row">
        <div class="col-md-9">
          {{data.description}}
        </div>
        <div class="col-md-3">
          <router-link class="btn btn-blue"
                       v-if="data.stage === 0"
                       :to="`task/${item._id}`">View details / apply</router-link>
          <router-link class="btn btn-white"
                       v-if="data.stage !== 0"
                       :to="`task/${item._id}`">View details</router-link>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="deadline small">
          &lt;{{upperStatus}}&gt;
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { capitalize } from 'lodash';
import tasksService from '../../services/tasks.service';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'SearchTaskItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    upperStatus() {
      return this.status ? capitalize(this.status) : '';
    },
    status() {
      return tasksService.getTaskStatus(this.data.stage);
    },
    data() {
      return this.item._source;
    },
  },
};
</script>
