/* eslint-disable no-param-reassign */
const initialState = {
  mainLoader: true,
  notificationText: null,
  notificationType: null,
  fileUploaderVisible: false,
  fileUploaderType: null,
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

  /**
   * Open file uploader
   * @param state
   * @param {String} uploaderType
   */
  openFileUploader(state, uploaderType) {
    state.fileUploaderVisible = true;
    state.fileUploaderType = uploaderType;
  },

  /**
   * Close file uploader
   * @param state
   */
  closeFileUploader(state) {
    state.fileUploaderVisible = false;
    state.fileUploaderType = null;
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
