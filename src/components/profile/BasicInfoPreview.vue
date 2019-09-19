<template>
  <div class="row">
    <div class="col-4">
      <avatar-display class="mb-4" :avatar="freelancer.avatar"/>
      <a v-if="freelancer.web" :href="freelancer.web" class="d-block"><u>
        <small>{{freelancer.web}}</small>
      </u></a>
    </div>
    <div class="col-8">
      <h1>{{freelancer.firstName}} {{freelancer.lastName}}</h1>
      <h6 class="mb-4 font-weight-normal">
        <span v-if="freelancer.occupation">{{freelancer.occupation}}</span>
        <span v-if="freelancer.location">in {{freelancer.location}}</span>
      </h6>

      <p class="mb-4 lead">{{bio}}</p>

      <tags-display :tags="freelancer.skills" class="mb-5"/>

      <b-button variant="info"
                class="btn-round"
                @click="publish"
                :disabled="publishing"
                v-if="!freelancer.published">
        <template v-if="!publishing">Publish profile</template>
        <template v-if="publishing">Publishing profile...</template>
      </b-button>
    </div>
  </div>
</template>

<script>
import { truncate } from 'lodash';
import TagsDisplay from '../ui/TagsDisplay.vue';
import AvatarDisplay from '../ui/AvatarDisplay.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'BasicInfoPreview',
  components: {
    AvatarDisplay,
    TagsDisplay,
  },
  data() {
    return {
      publishing: false,
    };
  },
  props: {
    freelancer: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    bio() {
      return truncate(this.freelancer.bio, {
        length: 200,
        separator: ' ',
      });
    },
  },
  methods: {
    async publish() {
      this.publishing = true;
      await this.$store.dispatch('user/publishFreelancerProfile');
      this.publishing = false;
      this.$store.dispatch('ui/showNotification', {
        type: 'success',
        text: 'Profile successfully published',
      });
      this.$router.replace('/');
    },
  },
};
</script>
