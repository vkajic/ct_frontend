<template>
  <ul class="list-unstyled m-0">
    <li>
      <language-router-link to="/tasks">
        <inbox-icon size="1.5x"/>
        {{ $t('freelancers.browse_jobs') }}
      </language-router-link>
    </li>
    <li>
      <language-router-link to="/in-progress">
        <coffee-icon size="1.5x"/>
        {{ $t('freelancers.my_jobs') }}
      </language-router-link>
    </li>
    <li>
      <language-router-link to="/applications">
        <check-square-icon size="1.5x"/>
        {{ $t('freelancers.applications_sent') }}
      </language-router-link>
    </li>
    <li class="d-none d-lg-block">
      <language-router-link to="/completed">
        <check-icon size="1.5x"/>
        {{ $t('freelancers.completed_jobs') }}
      </language-router-link>
    </li>
    <li class="d-lg-none">
      <language-router-link to="/messages">
        <mail-icon size="1.5x"/>
        {{ $t('freelancers.messages') }}
      </language-router-link>
    </li>
  </ul>
</template>

<script>
import {
  CheckSquareIcon, CoffeeIcon, InboxIcon, MailIcon, CheckIcon,
} from 'vue-feather-icons';
import LanguageRouterLink from '../ui/LanguageRouterLink.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'FreelancerMenu',
  components: {
    LanguageRouterLink,
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
