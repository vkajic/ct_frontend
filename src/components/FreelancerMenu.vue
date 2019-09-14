<template>
  <ul class="freelancer-menu list-unstyled pt-5 pl-2">
    <li class="mb-5">
      <router-link to="/search">
        <inbox-icon size="2x" class="mr-3"/>
        <span>Browse jobs</span>
      </router-link>
    </li>
    <li class="mb-5">
      <router-link to="/my-jobs">
        <coffee-icon size="2x" class="mr-3"/>
        <span>My jobs</span>
      </router-link>
    </li>
    <li class="mb-5">
      <router-link to="/applied">
        <check-square-icon size="2x" class="mr-3"/>
        <span>Applications sent</span>
      </router-link>
    </li>
  </ul>
</template>

<script>
import { InboxIcon, CoffeeIcon, CheckSquareIcon } from 'vue-feather-icons';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'FreelancerMenu',
  components: {
    InboxIcon,
    CoffeeIcon,
    CheckSquareIcon,
  },
};
</script>
