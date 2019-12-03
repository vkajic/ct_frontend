/* eslint-disable no-param-reassign */
/* import { orderBy, set, get } from 'lodash'; */
import apiService from '../services/api.service';

const initialState = {
  loading: false,
  activeItem: 0,
  applications: [],
};

const actions = {
  /**
   * Get all applications info for user and set them if not already set
   * @param commit
   * @param state
   * @return {Promise<void>}
   */
  async getApplications({ commit, state }) {
    if (!state.applications.length) {
      commit('setLoading', true);
      const { data } = (await apiService.get('applications/messages-info')).data;
      if (data.role === 'client') {
        commit('setApplicationsClient', data.data);
      } else {
        commit('setApplicationsFreelancer', data.data);
      }
      commit('setLoading', false);
    }
  },
};

const mutations = {
  /**
   * Is chat history loading
   * @param state
   * @param {Boolean} b
   */
  setLoading(state, b) {
    state.loading = b;
  },

  /**
   * Set clicked item in chat history
   * @param state
   * @param {Number} id
   */
  setActiveItem(state, id) {
    state.activeItem = id;
  },

  /**
   * Set list of applications for freelancer
   * @param state
   * @param {Array} items
   */
  setApplicationsFreelancer(state, items) {
    state.applications = items;
  },

  /**
   * Set list of applications for client
   * @param state
   * @param {Array} items
   */
  setApplicationsClient(state, items) {
    const data = [];
    items.forEach((app) => {
      const index = data.findIndex(val => app.taskId === val.taskId);
      if (index === -1) {
        // if there is no item with taskId in data, add new object
        data.push({
          taskId: app.taskId,
          taskTitle: app.taskTitle,
          applications: [{
            id: app.id,
            role: app.role,
            online: app.online,
            status: app.status,
            lastMsg: app.lastMsg,
          }],
        });
      } else {
        // if there is item with taskId in data, push to applications
        data[index].applications.push({
          id: app.id,
          role: app.role,
          online: app.online,
          status: app.status,
          lastMsg: app.lastMsg,
        });
      }
    });
    state.applications = data;
  },

  /**
   * Remove applications
   * @param state
   */
  resetApplications(state) {
    state.applications = [];
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
