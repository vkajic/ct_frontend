/* eslint-disable import/no-cycle */
import authService from '../services/auth.service';
import tokenService from '../services/token.service';
import apiService from '../services/api.service';
import userService from '../services/user.service';
import router from '../router';

const initialState = {
  token: null,
  user: null,
  loginError: null,
  registrationError: null,
};

const mutations = {
  setToken(state, token) {
    state.token = token;
  },

  setUser(state, user) {
    state.user = user;
  },
};

const actions = {
  /**
   * Init auth data (token and user) from local storage and API
   * @param commit
   */
  async init({ commit }) {
    const token = tokenService.getToken();

    // If token exists set header
    if (token) {
      apiService.setHeader();

      commit('setToken', token);

      try {
        const user = await authService.getMe();

        if (user) {
          commit('setToken', token);
          commit('setUser', user.data.data);
        } else {
          tokenService.removeToken();
          apiService.removeHeader();
          commit('setToken', null);
          commit('setUser', null);
        }
      } catch (err) {
        tokenService.removeToken();
        apiService.removeHeader();
        commit('setToken', null);
        commit('setUser', null);
      }
    }
  },

  /**
   * Login user
   * @param commit
   * @param dispatch
   * @param {Object} credentials
   * @return {Promise<*>}
   */
  async login({ commit, dispatch }, credentials) {
    const login = await authService.login(credentials);

    commit('setToken', login.data.data.token);
    commit('setUser', login.data.data.user);
    commit('setUser', login.data.data.user);

    tokenService.saveToken(login.data.data.token);
    apiService.setHeader();

    // get unread messages
    dispatch('chat/getUnreadMessages', null, { root: true });

    this._vm.$socket.disconnect();
    this._vm.$socket.connect();

    return login;
  },

  /**
   * Register user
   * @param commit
   * @param {Object} data
   * @return {*}
   */
  // eslint-disable-next-line no-unused-vars
  register({ commit }, data) {
    return authService.register(data);
  },

  /**
   * Log out user
   * @param commit
   */
  logout({ commit }) {
    commit('setToken', null);
    commit('setUser', null);

    tokenService.removeToken();
    apiService.removeHeader();

    router.replace('/auth');
  },

  /**
   * Update current user
   * @param commit
   * @param {Object} data
   * @return {*}
   */
  async updateMe({ commit }, data) {
    const user = await userService.updateMe(data);

    commit('setUser', user.data.data);
  },
};

const getters = {
  /**
   * Get currently logged user ID
   * @param state
   * @return {*}
   */
  getCurrentUserId(state) {
    if (state.user) {
      return state.user.id;
    }

    return null;
  },
};

const store = {
  namespaced: true,
  state: initialState,
  mutations,
  actions,
  getters,
};

export default store;
