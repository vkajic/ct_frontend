<template>
  <div class="freelancer-search-item d-flex align-items-start">
    <router-link :to="`/freelancers/${id}`">
      <avatar-picture :file="freelancer.avatar" :thumbnail="true" class="mr-3 mr-lg-4"/>
    </router-link>
    <div>
      <h2 class="mb-1">
        <router-link :to="`/freelancers/${id}`">
          {{freelancer.firstName}} {{freelancer.lastName}}
        </router-link>
      </h2>
      <div>
        {{freelancer.occupation}} <span v-if="freelancer.location">in</span> {{freelancer.location}}
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
import AvatarPicture from '../profile/AvatarPicture.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'FreelancersSearchItem',
  components: {
    AvatarPicture,
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
};
</script>
