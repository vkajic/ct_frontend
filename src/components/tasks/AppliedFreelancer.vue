<template>
  <div class="applied-freelancer">
    <header class="d-flex align-items-center justify-content-between p-3">
      <div class="d-flex align-items-top">
        <avatar-display :avatar="freelancer.avatar"/>
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
    <p class="py-3 pr-3">{{freelancer.bio}}</p>
  </div>
</template>

<script>
import { dateFilter } from 'vue-date-fns';
import AvatarDisplay from '../ui/AvatarDisplay.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'AppliedFreelancer',
  components: { AvatarDisplay },
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
};
</script>
