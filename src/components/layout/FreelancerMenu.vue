<template>
  <div>
    <ul class="list-unstyled m-0">
    <li>
      <router-link to="/tasks">
        <inbox-icon size="1.5x"/>
        Browse jobs
      </router-link>
    </li>
    <li>
      <router-link to="/in-progress">
        <coffee-icon size="1.5x"/>
        My jobs
      </router-link>
    </li>
    <li>
      <router-link to="/applications">
        <check-square-icon size="1.5x"/>
        Applications sent
      </router-link>
    </li>
  </ul>

    <chat-history class="mt-5" @select="openMessages"/>
  </div>
</template>

<script>
import { CheckSquareIcon, CoffeeIcon, InboxIcon } from 'vue-feather-icons';
import ChatHistory from '../tasks/chat/ChatHistory.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'FreelancerMenu',
  components: {
    CheckSquareIcon,
    CoffeeIcon,
    InboxIcon,
    ChatHistory,
  },
  data() {
    return {
      items: [],
    };
  },
  methods: {
    openMessages(application) {
      if (application.status === 1) {
        this.$router.push(
          {
            name: 'inProgressItem',
            params: {
              id: application.id,
              openMsgs: true,
            },
          },
        );
      } else {
        this.$router.push(
          {
            name: 'application',
            params: {
              id: application.id,
              openMsgs: true,
            },
          },
        );
      }
    },
  },
};
</script>
