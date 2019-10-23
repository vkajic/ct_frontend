<template>
  <div class="applied-freelancer">
    <header class="d-flex align-items-center justify-content-between p-3">
      <div class="d-flex align-items-top">
        <avatar-picture :file="freelancer.avatar"/>
        <div>
          <router-link :to="`freelancers/${freelancer.id}`" class="freelancer-name">
            {{fullName}}
          </router-link>
          <div class="freelancer-occupation">
            {{freelancer.occupation}} in {{freelancer.location}}
          </div>
          <div class="freelancer-meta">4 years of experience 6/10 skills required</div>
        </div>
      </div>
      <div class="text-muted">
        <small>{{application.createdAt | date('MMM Do')}}</small>
      </div>
    </header>
    <p class="pt-3 pr-3">{{application.letter}}</p>

    <div class="reply">
      <b-button variant="light" class="btn-round" @click="reply">Reply</b-button>
    </div>
  </div>
</template>

<script>
import { dateFilter } from 'vue-date-fns';
import AvatarPicture from '../profile/AvatarPicture.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'AppliedFreelancer',
  components: { AvatarPicture },
  props: {
    application: {
      type: Object,
      required: true,
    },
  },
  filters: {
    date: dateFilter,
  },
  computed: {
    avatar() {
      return null;
    },
    freelancer() {
      return this.application.freelancer;
    },
    fullName() {
      return `${this.freelancer.firstName} ${this.freelancer.lastName}`;
    },
  },
  methods: {
    reply() {
      this.$store.commit('tasks/setSelectedApplication', this.application);
      this.$emit('select', this.application);
    },
  },
};
</script>
