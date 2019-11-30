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
   * Get all applications info for freelancer and set them if not already set
   * @param commit
   * @param state
   * @return {Promise<void>}
   */
  async getApplicationsFreelancer({ commit, state }) {
    if (!state.applications.length) {
      commit('setLoading', true);
      const apps = (await apiService.get('applications/freelancer-messages')).data.data;
      commit('setApplications', apps);
      commit('setLoading', false);
    }
  },

  /**
   * Get all applications info for client and set them
   * @param commit
   * @param {Array} ids
   * @return {Promise<void>}
   */
  async getApplicationsClient({ commit, state }) {
    if (!state.applications.length) {
      commit('setLoading', true);
      const apps = (await apiService.get('applications/client-messages')).data.data;
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
