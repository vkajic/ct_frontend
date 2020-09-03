const statusMapping = {
  0: 'applications',
  1: 'in-progress',
  2: 'completed',
  3: 'completed',
  4: 'completed',
};

// eslint-disable-next-line import/prefer-default-export
export const applicationUrl = {
  methods: {
    /**
     * @param {Object} application
     * @return {string}
     */
    generateApplicationUrl(application) {
      return `/${statusMapping[application.status]}/${application.id}`;
    },
  },
};
