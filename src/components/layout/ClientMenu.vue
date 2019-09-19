<template>
  <main-menu>
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
  </main-menu>
</template>

<script>
import { UsersIcon, CoffeeIcon, BriefcaseIcon } from 'vue-feather-icons';
import MainMenu from '../ui/MainMenu.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ClientMenu',
  components: {
    MainMenu,
    UsersIcon,
    CoffeeIcon,
    BriefcaseIcon,
  },
};
</script>
