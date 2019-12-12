<template>
  <ul class="list-unstyled m-0">
    <li>
      <router-link to="/freelancers">
        <users-icon size="1.5x"/>
        Browse freelancers
      </router-link>
    </li>
    <li>
      <router-link to="/my-tasks">
        <coffee-icon size="1.5x"/>
        My jobs
      </router-link>
    </li>
    <li>
      <router-link to="/create-task">
        <briefcase-icon size="1.5x"/>
        Post job
      </router-link>
    </li>
    <li class="d-lg-none">
      <router-link to="/messages">
        <mail-icon size="1.5x"/>
        Messages
      </router-link>
    </li>
  </ul>
</template>

<script>
import {
  UsersIcon, CoffeeIcon, BriefcaseIcon, MailIcon,
} from 'vue-feather-icons';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ClientMenu',
  components: {
    UsersIcon,
    CoffeeIcon,
    BriefcaseIcon,
    MailIcon,
  },
};
</script>
