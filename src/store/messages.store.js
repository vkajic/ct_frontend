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
   * Get all applications info for user and set them if not already set teest
   * @param commit
   * @param state
   * @return {Promise<void>}
   */
  async getApplications({ commit, state }) {
    if (!state.applications.length) {
      commit('setLoading', true);
      const apps = (await apiService.get('applications/messages-info')).data.data;
      commit('setApplications', apps);
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
   * Set list of applications
   * @param state
   * @param {Array} items
   */
  setApplications(state, items) {
    state.applications = items;
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
