<template>
  <div class="freelancer-search-item d-flex align-items-start">
    <router-link :to="`/freelancers/${id}`">
      <avatar-display :avatar="freelancer.avatar"
                      :user-name="fullName"
                      :options="avatarOptions"
                      class="mr-3 mr-lg-4"/>
    </router-link>
    <div>
      <h2 class="mb-1 font-16-sm">
        <router-link :to="`/freelancers/${id}`">
          {{fullName}}
        </router-link>
      </h2>
      <div class="font-14-sm">
        {{freelancer.occupation}} <span
        v-if="freelancer.location">{{ $t('freelancers_search.in') }}</span> {{freelancer.location}}
      </div>
      <ul class="list-unstyled list-inline m-0">
        <li class="list-inline-item text-muted pr-2" v-for="s in skills" :key="s">
          <small>{{s}}</small>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import AvatarDisplay from '../ui/AvatarDisplay.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'FreelancersSearchItem',
  components: {
    AvatarDisplay,
  },
  data() {
    return {
      avatarOptions: {
        resize: {
          width: 90,
          height: 90,
        },
      },
    };
  },
  props: {
    freelancer: {
      type: Object,
      required: true,
    },
    id: {
      // eslint-disable-next-line
      type: Number | String,
      default: null,
    },
    skills: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    fullName() {
      return `${this.freelancer.firstName} ${this.freelancer.lastName}` || '';
    },
  },
};
</script>
