export default {
  computed: {
    ogSiteUrl() {
      return `${window.location.protocol}//${window.location.hostname}`;
    },
    ogImageUrl() {
      return `${window.location.protocol}//${window.location.hostname}${require('@/assets/img/ograph.png')}`;
    },
  },
};
