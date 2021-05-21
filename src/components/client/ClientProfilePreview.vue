<template>
  <div>
    <paper class="mb-5">
      <div class="row freelancer-basic">
        <div class="col-12 col-lg-4 d-flex flex-column align-items-center">
          <avatar-display class="mb-4"
                          :avatar="client.avatar"
                          :user-name="client.name"
                          :options="avatarOptions"/>

          <client-rate :client-id="client.id"/>
        </div>
        <div class="col-12 col-lg-8">
          <div class="d-flex align-items-center">
            <h1 class="text-center text-lg-left">
              {{ client.name }}
            </h1>
            <bc-check-status checkType="client" :client="client" class="ml-3"/>
          </div>
          <h6 class="mb-4 font-weight-normal text-center text-lg-left">
            <template v-if="client.location">{{ client.location }}</template>
          </h6>
          <div class="mb-4 lead text-wrap" v-html="client.about"></div>
        </div>
      </div>
    </paper>

    <div class="row">
      <div class="col-12 col-lg-10 offset-lg-1">
        <b-tabs content-class="py-4">
          <b-tab :title="$t('client_profile.published_tasks')" active>
            <client-tasks-list :client-id="client.id"/>
          </b-tab>
          <b-tab :title="$t('client_profile.feedbacks')">
            <client-feedbacks :client-id="client.id"/>
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Paper from '../ui/Paper.vue';
import AvatarDisplay from '../ui/AvatarDisplay.vue';
import ClientFeedbacks from './ClientFeedbacks.vue';
import ClientTasksList from './ClientTasksList.vue';
import ClientRate from './ClientRate.vue';
import BcCheckStatus from '../common/BcCheckStatus.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ClientProfilePreview',
  components: {
    ClientRate,
    ClientTasksList,
    ClientFeedbacks,
    AvatarDisplay,
    Paper,
    BcCheckStatus,
  },
  props: {
    client: {
      type: Object,
      required: true,
    },
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
};
</script>
