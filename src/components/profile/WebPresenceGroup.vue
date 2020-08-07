<template>
  <div class="web-presence-group mb-4">
    <web-presence-item v-if="freelancer.linkedin" class="web-presence-group__item"
                       :href="linkedinUrl" ariaLabel="Link to the Linkedin profile">
      <font-awesome-icon :icon="linkedinIcon" size="lg"/>
    </web-presence-item>
    <web-presence-item v-if="freelancer.web" class="web-presence-group__item" :href="websiteUrl"
                       ariaLabel="Link to the Website">
      <font-awesome-icon :icon="websiteIcon" size="lg"/>
    </web-presence-item>
    <web-presence-item v-if="freelancer.blog" class="web-presence-group__item"
                       :href="blogUrl"
                       ariaLabel="Link to the Blog">
      <font-awesome-icon :icon="blogIcon" size="lg"/>
    </web-presence-item>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGlobeEurope, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import WebPresenceItem from './WebPresenceItem.vue';

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
    websiteUrl() {
      const pattern = /^((http|https|ftp):\/\/)/;

      if (!pattern.test(this.freelancer.web)) {
        return `http://${this.freelancer.web}`;
      }

      return this.freelancer.web;
    },

    blogUrl() {
      const pattern = /^((http|https|ftp):\/\/)/;

      if (!pattern.test(this.freelancer.blog)) {
        return `http://${this.freelancer.blog}`;
      }

      return this.freelancer.blog;
    },

    linkedinUrl() {
      const pattern = /^((http|https|ftp):\/\/)/;

      if (!pattern.test(this.freelancer.linkedin)) {
        return `http://${this.freelancer.linkedin}`;
      }

      return this.freelancer.linkedin;
    },
  },
};
</script>
