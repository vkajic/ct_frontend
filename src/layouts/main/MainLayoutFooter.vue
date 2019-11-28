<template>
  <footer class="pb-6 py-lg-5">
    <mobile-menu/>
  </footer>
</template>

<script>
import MobileMenu from '../../components/layout/MobileMenu.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'MainLayoutFooter',
  components: { MobileMenu },
  computed: {
    src() {
      const imageRequest = JSON.stringify({
        bucket: 'cryptotask-public',
        key: '1569019527985_70613135_2269629273147898_7516537804197724160_o.png',
        edits: {
          grayscale: true,
          resize: {
            width: 100,
          },
        },
      });
      return `https://d1q1jqg91mol8o.cloudfront.net/${btoa(imageRequest)}`;
    },
  },
};
</script>
