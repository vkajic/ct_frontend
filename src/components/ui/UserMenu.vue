<template>
  <b-dropdown variant="link" no-caret right toggle-class="p-0" size="lg">
    <template slot="button-content">
      <span class="d-none d-lg-block small">{{ userName }}</span>
      <span class="d-block d-lg-none">
              <user-icon size="1.5x"/>
            </span>
    </template>
    <b-dropdown-item-button @click="logout">{{ $t('common.logout') }}</b-dropdown-item-button>
    <b-dropdown-divider/>
    <language-dropdown-item to="/profile">{{ $t('common.edit_profile') }}</language-dropdown-item>
    <language-dropdown-item to="/profile/preview">
      {{ $t('common.preview_profile') }}
    </language-dropdown-item>
    <language-dropdown-item to="/change-password">
      {{ $t('common.change_password') }}
    </language-dropdown-item>
    <language-dropdown-item to="/affiliate">{{ $t('common.affiliate') }}</language-dropdown-item>
  </b-dropdown>
</template>

<script>
import { UserIcon } from 'vue-feather-icons';
import LanguageDropdownItem from '@/components/ui/LanguageDropdownItem.vue';
import languageRouter from '../mixins/languageRouter';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'UserMenu',
  components: {
    UserIcon,
    LanguageDropdownItem,
  },
  mixins: [languageRouter],
  methods: {
    /**
     * Logout
     */
    async logout() {
      await this.replace('/login');
      await this.$store.dispatch('user/logout');
    },
  },
  computed: {
    /**
     * Get users name
     * @return {*}
     */
    userName() {
      return this.$store.getters['user/getUserName'];
    },
  },
};
</script>
