<template>
  <div class="applied-freelancer" v-if="freelancer">
    <header class="d-flex align-items-center justify-content-between p-3">
      <div class="d-flex align-items-top">
        <avatar-display :avatar="freelancer.avatar"
                        :user-name="freelancer.name"
                        :options="avatarOptions"/>
        <div>
          <div class="d-flex align-items-center">
            <language-router-link :to="`/freelancers/${freelancer.id}`"
                                  class="freelancer-name mr-2">
              {{freelancer.name}}
            </language-router-link>
            <application-status-badge :application="application"/>
          </div>
          <div class="freelancer-occupation">
            {{freelancer.occupation}} {{$t('applications.in')}} {{freelancer.location}}
          </div>
          <div class="freelancer-meta">
            {{matchingSkills.length}}/{{this.task.skills.length}}
            {{$t('applications.skills_required')}}
          </div>
        </div>
      </div>
      <div class="text-muted">
        <small>{{application.createdAt | date('MMM Do')}}</small>
      </div>
    </header>
    <p class="pt-3 pr-3">{{application.letter}}</p>

    <client-application-buttons :application="application"
                                @hire="$emit('hire', application)"
                                @select="$emit('select', application)"
                                @feedback="leaveFeedback"/>

    <div v-if="application.feedback && application.feedback.freelancerRate">
      <hr>
      <application-feedback :feedback="application.feedback"/>
    </div>
  </div>
</template>

<script>
import { intersection } from 'lodash';
import { dateFilter } from 'vue-date-fns';
import AvatarDisplay from '../ui/AvatarDisplay.vue';
import ClientApplicationButtons from './ClientApplicationButtons.vue';
import ApplicationStatusBadge from './ApplicationStatusBadge.vue';
import ApplicationFeedback from '../client/ApplicationFeedback.vue';
import LanguageRouterLink from '../ui/LanguageRouterLink.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'AppliedFreelancer',
  components: {
    LanguageRouterLink,
    ApplicationFeedback,
    ApplicationStatusBadge,
    ClientApplicationButtons,
    AvatarDisplay,
  },
  data() {
    return {
      hiring: false,
      avatarOptions: {
        resize: {
          width: 90,
          height: 90,
        },
      },
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
    leaveFeedback(status) {
      this.$emit('feedback', {
        application: this.application,
        status,
      });
    },
  },
};
</script>
