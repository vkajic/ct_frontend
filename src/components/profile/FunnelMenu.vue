<template>
  <ul class="list-unstyled funnel-menu">
    <!-- <li v-for="(item, index) in items"
        :key="index"
        :class="{'completed': item.completed, 'active': item.active}">
      <router-link :to="item.link" v-if="item.completed">
        <check-circle-icon/>
        {{item.title}}
      </router-link>

      <div v-if="!item.completed">
        <check-circle-icon/>
        {{item.title}}
      </div>
    </li> -->

    <li class="completed">
      <a href="#">
        <check-circle-icon/>
        Basic info
      </a>
    </li>
    <li class="active">
      <a href="#">
        <check-circle-icon/>
        Skills & services
      </a>
    </li>
    <li>
      <a href="#">
        <check-circle-icon/>
        Work experience
      </a>
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
