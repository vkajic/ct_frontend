<template>
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
    <li class="d-none d-lg-block">
      <router-link to="/completed">
        <check-icon size="1.5x"/>
        Completed jobs
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
  CheckSquareIcon, CoffeeIcon, InboxIcon, MailIcon, CheckIcon,
} from 'vue-feather-icons';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'FreelancerMenu',
  components: {
    CheckSquareIcon,
    CoffeeIcon,
    InboxIcon,
    MailIcon,
    CheckIcon,
  },
  data() {
    return {
      items: [],
    };
  },
};
</script>
