import apiService from '../services/api.service';

/* eslint-disable no-param-reassign */
const initialState = {
  notifications: [],
  popoverDisplayed: false,
};

const actions = {
  /**
   * Get notifications
   * @param commit
   * @return {Promise<void>}
   */
  async getNotifications({ commit }) {
    const notifications = await apiService.get('/notifications');
    commit('setNotifications', notifications.data.data);
  },

  /**
   * Socket triggered action when new notification is received
   * @param commit
   * @param {Object} notification
   */
  socket_receivedNotification({ commit }, notification) {
    commit('addNotification', notification);
  },

  /**
   * Set notification as seen
   * @param commit
   * @param {Object} notification
   * @return {Promise<void>}
   */
  async seeNotification({ commit }, notification) {
    await apiService.put(`/notifications/${notification.id}/seen`);
    commit('removeNotification', notification);
  },
};

const mutations = {
  /**
   * Set notifications to store
   * @param state
   * @param {Array} notifications
   */
  setNotifications(state, notifications) {
    state.notifications = notifications;
  },

  /**
   * Add new notification
   * @param state
   * @param {Object} notification
   */
  addNotification(state, notification) {
    state.notifications.push(notification);
  },

  /**
   * Remove notification from state
   * @param state
   * @param {Object} notification
   */
  removeNotification(state, notification) {
    const index = state.notifications.findIndex(n => n.id === notification.id);

    if (index > -1) {
      state.notifications.splice(index, 1);
    }
  },

  /**
   * Show notifications popover
   * @param state
   */
  showPopover(state) {
    state.popoverDisplayed = true;
  },

  /**
   * Hide notifications popover
   * @param state
   */
  hidePopover(state) {
    state.popoverDisplayed = false;
  },
};

const getters = {};

const store = {
  namespaced: true,
  state: initialState,
  mutations,
  actions,
  getters,
};

export default store;
