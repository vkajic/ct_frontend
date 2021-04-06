<template>
  <language-router-link :to="`/clients/${employer.slug}/${employer.id}`"
                        class="employer d-flex align-items-center">
    <avatar-display :avatar="employer.avatar"
                    v-if="employer.avatar"
                    class="mr-2"
                    :options="avatarOptions"/>
    {{ employer.name }}
  </language-router-link>
</template>

<script>
import AvatarDisplay from '../ui/AvatarDisplay.vue';
import LanguageRouterLink from '../ui/LanguageRouterLink.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'SmallEmployer',
  components: {
    LanguageRouterLink,
    AvatarDisplay,
  },
  data() {
    return {
      avatarOptions: {
        resize: {
          width: 24,
          height: 24,
        },
      },
    };
  },
  props: {
    employer: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
