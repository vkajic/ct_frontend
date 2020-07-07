<template>
  <b-dropdown class="dropdown--responsive d-xl-none" variant="link" no-caret right
              toggle-class="p-0" v-if="!user">
    <template slot="button-content">
        <span class="d-block">
              <menu-icon size="1.5x"/>
        </span>
    </template>
    <language-dropdown-item to="/tasks">{{ $t('common.browse_jobs') }}</language-dropdown-item>
    <language-dropdown-item to="/freelancers">{{ $t('common.browse_freelancers') }}
    </language-dropdown-item>
    <language-dropdown-item to="/login">{{ $t('common.post_job') }}</language-dropdown-item>
    <b-dropdown-item :href="landingUrl">{{ $t('common.how_it_works') }}
    </b-dropdown-item>
    <b-dropdown-divider/>
    <language-dropdown-item to="/login">{{ $t('auth.login.title') }}</language-dropdown-item>
    <language-dropdown-item to="/sign-up">{{ $t('auth.sign_up.title') }}</language-dropdown-item>
  </b-dropdown>
</template>

<script>
import { MenuIcon } from 'vue-feather-icons';
import LanguageDropdownItem from '../ui/LanguageDropdownItem.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'MobileTopMenu',
  components: {
    LanguageDropdownItem,
    MenuIcon,
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    },
    landingUrl() {
      return `${process.env.VUE_APP_LANDING_URL}how-cryptotask-works?mode=${this.isDarkThemeEnabled ? 'dark' : 'light'}`;
    },
    isDarkThemeEnabled() {
      return this.$store.state.ui.isDarkThemeEnabled;
    },
  },
};
</script>
