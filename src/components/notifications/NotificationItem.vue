<template>
  <keep-alive>
    <component :is="notificationTemplateName" v-bind="{notification}" @open="open"/>
  </keep-alive>
</template>

<script>
import { upperFirst, camelCase } from 'lodash';

const templates = ['NewMessage'];
const components = {};

function loadComponent(component) {
  return import(`./templates/${component}.vue`);
}

templates.forEach((component) => {
  components[component] = () => loadComponent(component);
});

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'NotificationItem',
  components: {
    ...components,
  },
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  computed: {
    notificationTemplateName() {
      return upperFirst(camelCase(this.notification.type));
    },
  },
  methods: {
    open(e) {
      this.$emit('open', e);
    },
  },
};
</script>
