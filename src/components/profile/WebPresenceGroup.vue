<template>
    <div class="web-presence-group">
        <WebPresenceItem v-if="freelancer.linkedin" class="web-presence-group__item" :href="freelancer.linkedin" ariaLabel="Link to the Linkedin profile">
            <linkedin-icon size="1.5x"></linkedin-icon>
        </WebPresenceItem>
        <WebPresenceItem v-if="freelancer.web" class="web-presence-group__item" :href="freelancer.web" ariaLabel="Link to the Webpage">
            <globe-icon size="1.5x"></globe-icon>
        </WebPresenceItem>
        <WebPresenceItem v-if="freelancer.blogdsfsd" class="web-presence-group__item" :href="freelancer.web" ariaLabel="Link to the Blog">
            <edit-icon size="1.5x"></edit-icon>
        </WebPresenceItem>
    </div>
</template>

<script>
import {
  LinkedinIcon, GlobeIcon, EditIcon,
} from 'vue-feather-icons';
import WebPresenceItem from './WebPresenceItem.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'WebPresenceGroup',
  components: {
    WebPresenceItem,
    LinkedinIcon,
    GlobeIcon,
    EditIcon,
  },
  props: {
    freelancer: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
