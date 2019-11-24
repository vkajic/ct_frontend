export default {
  data() {
    return {
      fromRoute: null,
    };
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.fromRoute = from;
    });
  },

  methods: {
    /**
     * Handle Back
     * @desc Extends default router back functionality
     * @param {string} fallback - The fallback path if there is no history to use
     * with $router.back(). This is usually the case if the
     * page was visited directly or from another site
     * */
    handleBack(fallback) {
      if (!this.fromRoute.name) {
        this.$router.push(fallback);
      } else {
        this.$router.back();
      }
    },
  },
};
