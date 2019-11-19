<template>
  <div class="applied-freelancer" v-if="freelancer">
    <header class="d-flex align-items-center justify-content-between p-3">
      <div class="d-flex align-items-top">
        <avatar-picture :file="freelancer.avatar" :thumbnail="true"/>
        <div>
          <router-link :to="`/freelancers/${freelancer.id}`" class="freelancer-name">
            {{fullName}}
          </router-link>
          <div class="freelancer-occupation">
            {{freelancer.occupation}} in {{freelancer.location}}
          </div>
          <div class="freelancer-meta">
            {{matchingSkills.length}}/{{this.task.skills.length}}
            skills required
          </div>
        </div>
      </div>
      <div class="text-muted">
        <small>{{application.createdAt | date('MMM Do')}}</small>
      </div>
    </header>
    <p class="pt-3 pr-3">{{application.letter}}</p>

    <div class="reply d-flex align-items-center">
      <b-button variant="light" class="btn-round mr-3" @click="reply">Reply</b-button>
      <b-button variant="info"
                class="btn-round"
                @click="hire"
                v-if="!alreadyHired"
                :disabled="hiring">
        {{hiring ? 'Hiring...' : 'Hire'}}
      </b-button>
    </div>
  </div>
</template>

<script>
import { intersection } from 'lodash';
import { dateFilter } from 'vue-date-fns';
import AvatarPicture from '../profile/AvatarPicture.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'AppliedFreelancer',
  components: { AvatarPicture },
  data() {
    return {
      hiring: false,
      hired: false,
    };
  },
  props: {
    application: {
      type: Object,
      required: true,
    },
    task: {
      type: Object,
      required: true,
    },
  },
  filters: {
    date: dateFilter,
  },
  computed: {
    freelancer() {
      return this.application.freelancer;
    },
    fullName() {
      return `${this.freelancer.firstName} ${this.freelancer.lastName}`;
    },
    alreadyHired() {
      return this.application.status === 1 || this.hired;
    },

    /**
     * Returns array of matching skills between task and freelancer
     */
    matchingSkills() {
      const taskSkills = this.task.skills.map(t => t.id);
      const freelancerSkills = this.freelancer.skills.map(f => f.id);

      return intersection(taskSkills, freelancerSkills);
    },
  },
  methods: {
    /**
     * Clicked on reply button
     */
    reply() {
      this.$store.commit('tasks/setSelectedApplication', this.application);
      this.$emit('select', this.application);
    },
    /**
     * Clicked on hire button
     * @return {Promise<void>}
     */
    async hire() {
      this.hiring = true;
      try {
        await this.$store.dispatch('tasks/hire', this.application);
        this.hiring = false;
        this.hired = true;

        this.$store.dispatch('ui/showNotification', {
          type: 'success',
          text: 'Freelancer successfully hired',
        });
      } catch (err) {
        this.hiring = false;

        this.$store.dispatch('ui/showNotification', {
          type: 'danger',
          text: 'Something went wrong',
        });
      }
    },
  },
};
</script>
