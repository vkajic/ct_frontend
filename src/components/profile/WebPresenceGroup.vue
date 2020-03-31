<template>
    <div class="web-presence-group">
        <WebPresenceItem v-if="freelancer.linkedin" class="web-presence-group__item" :href="freelancer.linkedin" ariaLabel="Link to the Linkedin profile">
            <font-awesome-icon :icon="linkedinIcon" size="lg" />
        </WebPresenceItem>
        <WebPresenceItem v-if="freelancer.web" class="web-presence-group__item" :href="freelancer.web" ariaLabel="Link to the Webpage">
            <font-awesome-icon :icon="websiteIcon" size="lg" />
        </WebPresenceItem>
        <WebPresenceItem v-if="freelancer.blog" class="web-presence-group__item" :href="freelancer.web" ariaLabel="Link to the Blog">
            <font-awesome-icon :icon="blogIcon" size="lg" />
        </WebPresenceItem>
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGlobeEurope, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import WebPresenceItem from './WebPresenceItem.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'WebPresenceGroup',
  components: {
    WebPresenceItem,
    FontAwesomeIcon,
  },
  props: {
    freelancer: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    linkedinIcon() {
      return faLinkedin;
    },
    websiteIcon() {
      return faGlobeEurope;
    },
    blogIcon() {
      return faPenSquare;
    },
  },
};
</script>
