const initialState = {
  mainLoader: false,
  notificationText: null,
  notificationType: null,
  taskSelectedTab: 0,
};

const mutations = {
  /**
   * Show main loader
   * @param state
   */
  showLoader(state) {
    state.mainLoader = true;
  },

  /**
   * Hide main loader
   * @param state
   */
  hideLoader(state) {
    state.mainLoader = false;
  },

  /**
   * Show alert notification
   * @param state
   * @param {String} text
   * @param {String} [type] - optional
   */
  showNotification(state, { text, type }) {
    state.notificationText = text;
    state.notificationType = type || 'success';
  },

  /**
   * Hide notification
   * @param state
   */
  hideNotification(state) {
    state.notificationText = null;
    state.notificationType = null;
  },

  /**
   * On client task select tab
   * @param state
   * @param {Number} tab
   */
  setTaskSelectedTab(state, tab) {
    state.taskSelectedTab = tab;
  },
};

const actions = {
  /**
   * Show notification with auto-close function
   * @param commit
   * @param {Object} data
   * @param {String} data.text
   * @param {String} data.type
   */
  showNotification({ commit }, data) {
    commit('showNotification', data);

    setTimeout(() => {
      commit('hideNotification');
    }, 5000);
  },
};

const store = {
  namespaced: true,
  state: initialState,
  mutations,
  actions,
};

export default store;
