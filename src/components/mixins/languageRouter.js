import isString from 'lodash/isString';
import set from 'lodash/set';

// eslint-disable-next-line import/prefer-default-export
export default {
  methods: {
    /**
     * Push url
     * @param {String|Object} url
     * @return {string}
     */
    async push(url) {
      if (!isString(url) && (!url.params || !url.params.lang)) {
        set(url, 'params.lang', this.$route.params.lang);
      } else if (isString(url)) {
        url = `/${this.$route.params.lang}${url}`;
      }
      await this.$router.push(url);
    },

    /**
     * Replace url
     * @param {string|object} url
     * @return {Promise<void>}
     */
    async replace(url) {
      if (!isString(url) && (!url.params || !url.params.lang)) {
        set(url, 'params.lang', this.$route.params.lang);
      } else if (isString(url)) {
        url = `/${this.$route.params.lang}${url}`;
      }
      await this.$router.replace(url);
    },
  },
};
