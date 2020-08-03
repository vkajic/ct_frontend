<template>
  <div class="row freelancer-basic">
    <div class="col-12 col-lg-4 d-flex flex-column align-items-center">
      <avatar-display class="mb-4"
                      :avatar="freelancer.avatar"
                      :user-name="fullName"
                      :options="avatarOptions"/>
      <web-presence-group v-if="isThereWebPresence" :freelancer="freelancer" />
      <freelancer-rate :freelancer-id="freelancer.id"/>
    </div>
    <div class="col-12 col-lg-8">
      <h1 class="text-center text-lg-left">
        {{fullName}}
        <bc-check-status checkType="freelancer" :freelancer="freelancer" class="ml-2"/>
      </h1>
      <h6 class="mb-4 font-weight-normal text-center text-lg-left">
        <span v-if="freelancer.occupation">{{freelancer.occupation}}</span>
        <span v-if="freelancer.location"> in {{freelancer.location}}</span>
      </h6>

      <p class="mb-4 lead">{{bio}}</p>

      <tags-display :tags="freelancer.skills"
                    :linkable="skillsClickable"
                    class="mb-lg-5"
                    @click="$emit('skill-click', $event)"/>

      <div class="freelancer-buttons">
        <slot name="buttons"/>
      </div>
    </div>
  </div>
</template>

<script>
import { truncate } from 'lodash';
import TagsDisplay from '../ui/TagsDisplay.vue';
import AvatarDisplay from '../ui/AvatarDisplay.vue';
import FreelancerRate from '../freelancer/FreelancerRate.vue';
import WebPresenceGroup from './WebPresenceGroup.vue';
import BcCheckStatus from '../common/BcCheckStatus.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'BasicInfoPreview',
  components: {
    FreelancerRate,
    AvatarDisplay,
    TagsDisplay,
    WebPresenceGroup,
    BcCheckStatus,
  },
  data() {
    return {
      avatarOptions: {
        resize: {
          width: 240,
          height: 240,
        },
      },
    };
  },
  props: {
    freelancer: {
      type: Object,
      default() {
        return {};
      },
    },
    skillsClickable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    bio() {
      if (this.freelancer && this.freelancer.bio) {
        const striped = this.freelancer.bio.replace(/(<([^>]+)>)/ig, '');
        return truncate(striped, {
          length: 200,
          separator: ' ',
        });
      }

      return '';
    },

    fullName() {
      return `${this.freelancer.firstName} ${this.freelancer.lastName}` || '';
    },

    isThereWebPresence() {
      return this.freelancer.linkedin || this.freelancer.web || this.freelancer.blog;
    },
  },
};
</script>
