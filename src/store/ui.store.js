/* eslint-disable no-param-reassign */
const initialState = {
  mainLoader: true,
  notificationText: null,
  notificationType: null,
};

const mutations = {
  toggleLoader(state) {
    state.mainLoader = !state.mainLoader;
  },

  showNotification(state, { text, type }) {
    state.notificationText = text;
    state.notificationType = type || 'success';
  },

  hideNotification(state) {
    state.notificationText = null;
    state.notificationType = null;
  },
};

const actions = {};

const store = {
  namespaced: true,
  state: initialState,
  mutations,
  actions,
};

export default store;
