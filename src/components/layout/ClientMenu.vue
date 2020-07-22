<template>
  <ul class="list-unstyled m-0">
    <li>
      <language-router-link to="/freelancers">
        <users-icon size="1.5x"/>
        {{ $t('clients.browse_freelancers') }}
      </language-router-link>
    </li>
    <li>
      <language-router-link to="/my-tasks">
        <coffee-icon size="1.5x"/>
        {{ $t('clients.my_jobs') }}
      </language-router-link>
    </li>
    <li>
      <language-router-link to="/create-task">
        <briefcase-icon size="1.5x"/>
        {{ $t('clients.post_job') }}
      </language-router-link>
    </li>
    <li class="d-lg-none">
      <language-router-link to="/messages">
        <mail-icon size="1.5x"/>
        {{ $t('clients.messages') }}
      </language-router-link>
    </li>
  </ul>
</template>

<script>
import {
  UsersIcon, CoffeeIcon, BriefcaseIcon, MailIcon,
} from 'vue-feather-icons';
import LanguageRouterLink from '../ui/LanguageRouterLink.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ClientMenu',
  components: {
    LanguageRouterLink,
    UsersIcon,
    CoffeeIcon,
    BriefcaseIcon,
    MailIcon,
  },
};
</script>
