<template>
  <ul class="list-unstyled funnel-menu">
    <li>
      <router-link to="/create-freelancer/basic-info">
        <check-circle-icon/>
        Basic info
      </router-link>
    </li>
    <li>
      <router-link to="/create-freelancer/skills">
        <check-circle-icon/>
        Skills & services
      </router-link>
    </li>
    <li>
      <router-link to="/create-freelancer/work-experience">
        <check-circle-icon/>
        Work experience
      </router-link>
    </li>
    <li>
      <router-link to="/create-freelancer/projects">
        <check-circle-icon/>
        Add projects
      </router-link>
    </li>
    <li>
      <router-link to="/create-freelancer/preview">
        <check-circle-icon/>
        Publish profile
      </router-link>
    </li>
  </ul>
</template>

<script>
import { CheckCircleIcon } from 'vue-feather-icons';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'FunnelMenu',
  components: {
    CheckCircleIcon,
  },
  props: {
    items: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
