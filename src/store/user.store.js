/* eslint-disable import/no-cycle */
import tokenService from '../services/token.service';
import apiService from '../services/api.service';
import router from '../router';

const initialState = {
  token: null,
  user: null,
  loginError: null,
  registrationError: null,
  registrationRole: null,
  activeRole: null,
};

const actions = {
  /**
   * Init auth data (token and user) from local storage and API
   * @param commit
   * @param state
   */
  async init({ commit, state, dispatch }) {
    // check if there is token already in store
    if (!state.token) {
      const token = tokenService.getToken();

      // If token exists set header
      if (token) {
        apiService.setHeader();

        commit('setToken', token);
      }
    }

    // check if there is stored user already
    if (!state.user && state.token) {
      try {
        const user = await apiService.get('/users/me');
        const userData = user.data.data;

        commit('setUser', userData);

        // check if profile exists and if does not redirect to profile wizard
        const firstRole = userData.roles[0].name;

        commit('setActiveRole', firstRole);

        dispatch('chat/getThreads', null, { root: true });

        if (!userData[firstRole]) {
          await router.replace(`/create-${firstRole}/basic-info`);
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
    const login = await apiService.post('/auth/login', credentials);
    commit('setToken', login.data.data.token);

    tokenService.saveToken(login.data.data.token);
    apiService.setHeader();

    const user = await apiService.get('/users/me');
    const userData = user.data.data;

    commit('setUser', userData);

    // check if profile exists and if does not redirect to profile wizard
    const firstRole = userData.roles[0].name;

    commit('setActiveRole', firstRole);

    dispatch('chat/getThreads', null, { root: true });

    if (!userData[firstRole].name) {
      await router.replace(`/create-${firstRole}/basic-info`);
    } else {
      await router.replace('/');
    }

    // reset socket connection
    this._vm.$socket.disconnect();
    this._vm.$socket.connect();
  },

  /**
   * Register user
   * @param commit
   * @param {Object} data
   * @return {*}
   */
  // eslint-disable-next-line no-unused-vars
  register({ commit }, data) {
    return apiService.post('auth/register', data);
  },

  /**
   * Log out user
   * @param commit
   */
  logout({ commit }) {
    router.replace('/login');

    commit('setToken', null);

    tokenService.removeToken();
    apiService.removeHeader();

    commit('setUser', null);
    commit('removeActiveRole');
  },

  /**
   * Create freelancer basic data
   * @param commit
   * @param {Object} data
   * @return {Promise<void>}
   */
  async createFreelancerBasicInfo({ commit }, data) {
    const freelancerData = await apiService.post('/freelancers', data);

    commit('setFreelancerBasicData', freelancerData.data.data);
  },

  /**
   * Update freelancer basic data
   * @param commit
   * @param {Object} data
   * @return {Promise<void>}
   */
  async updateFreelancerBasicInfo({ commit }, data) {
    const freelancerData = await apiService.put('/freelancers', data);

    commit('setFreelancerBasicData', freelancerData.data.data);
  },

  /**
   * Update freelancer skills and categories
   * @param commit
   * @param data
   * @return {Promise<void>}
   */
  async updateFreelancerSkills({ commit }, data) {
    await apiService.put('/freelancers/skills', data);

    commit('setFreelancerSkills', data);
  },

  /**
   * Update freelancer resume file
   * @param commit
   * @param data
   * @return {Promise<void>}
   */
  async updateFreelancerResume({ commit }, data) {
    await apiService.put('/freelancers/resume', data);

    commit('setFreelancerResume', data);
  },

  /**
   * Delete freelancer resume
   * @param commit
   * @param data
   * @return {Promise<void>}
   */
  async removeFreelancerResume({ commit }, data) {
    await apiService.delete('/freelancers/resume', data);

    commit('setFreelancerResume', null);
  },

  /**
   * Update freelancer working experience
   * @param commit
   * @param {Object[]} data
   * @return {Promise<void>}
   */
  async updateFreelancerExperience({ commit }, data) {
    await apiService.put('/freelancers/experience', data);

    commit('setFreelancerExperience', data);
  },

  /**
   * Update freelancer past projects
   * @param commit
   * @param {Object[]} data
   * @return {Promise<void>}
   */
  async updateFreelancerProjects({ commit }, data) {
    await apiService.put('/freelancers/projects', data);

    commit('setFreelancerProjects', data);
  },

  /**
   * Create client basic data
   * @param commit
   * @param {Object} data
   * @return {Promise<void>}
   */
  async createClientBasicInfo({ commit }, data) {
    const clientData = await apiService.post('/clients', data);

    commit('setClientBasicData', clientData.data.data);
  },

  /**
   * Update client basic data
   * @param commit
   * @param {Object} data
   * @return {Promise<void>}
   */
  async updateClientBasicInfo({ commit }, data) {
    const clientData = await apiService.put('/clients', data);

    commit('setClientBasicData', clientData.data.data);
  },

  /**
   * Publish freelancer profile
   * @param commit
   * @return {Promise<void>}
   */
  async publishFreelancerProfile({ commit }) {
    await apiService.put('/freelancers/publish');

    commit('setFreelancerPublished');
  },
};

const mutations = {
  selectRole(state, role) {
    state.registrationRole = role;
  },

  /**
   * Set token
   * @param state
   * @param token
   */
  setToken(state, token) {
    state.token = token;
  },

  /**
   * Set user data
   * @param state
   * @param user
   */
  setUser(state, user) {
    state.user = user;
  },

  /**
   * Set active role for user
   * @param state
   * @param role
   */
  setActiveRole(state, role) {
    const userRoles = state.user.roles.map(r => r.name);

    // check if user has selected role attached
    if (userRoles.indexOf(role) > -1) {
      state.activeRole = role;
    }
  },

  /**
   * Reset active role to null
   * @param state
   */
  removeActiveRole(state) {
    state.activeRole = null;
  },

  /**
   * Set freelancer basic data
   * @param state
   * @param data
   */
  setFreelancerBasicData(state, data) {
    state.user.freelancer = Object.assign({}, data);
  },

  /**
   * Set avatar data
   * @param state
   * @param {Object} data
   * @param {String} data.role
   * @param {Object} data.avatar
   */
  setProfileAvatar(state, data) {
    state.user[data.role].avatar = data.avatar;
  },

  /**
   * Set freelancer skills and categories
   * @param state
   * @param data
   */
  setFreelancerSkills(state, data) {
    state.user.freelancer.skills = data.skills;
    state.user.freelancer.categories = data.categories;
  },

  /**
   * Set freelancer resume file
   * @param state
   * @param data
   */
  setFreelancerResume(state, data) {
    if (data) {
      state.user.freelancer.resume = data;
      state.user.freelancer.resumeId = data.id;
    } else {
      state.user.freelancer.resume = null;
      state.user.freelancer.resumeId = null;
    }
  },

  /**
   * Set freelancer working experiences
   * @param state
   * @param {Object[]} data
   */
  setFreelancerExperience(state, data) {
    state.user.freelancer.experiences = data;
  },

  /**
   * Set freelancer past projects
   * @param state
   * @param {Object[]} data
   */
  setFreelancerProjects(state, data) {
    state.user.freelancer.projects = data;
  },

  /**
   * Set freelancer as published
   * @param state
   */
  setFreelancerPublished(state) {
    state.user.freelancer.published = true;
  },

  /**
   * Set client basic data
   * @param state
   * @param data
   */
  setClientBasicData(state, data) {
    state.user.client = Object.assign({}, data);
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

  /**
   * Get user name depending on active role
   * @param state
   * @return {*}
   */
  getUserName(state) {
    if (state.user) {
      const { activeRole } = state;

      if (state.user[activeRole] && state.user[activeRole].name) {
        return state.user[activeRole].name;
      }

      return state.user.email;
    }

    return null;
  },

  /**
   * Get freelancer profile from user
   * @param state
   * @return {null}
   */
  getFreelancer(state) {
    return state.user && state.user.freelancer ? state.user.freelancer : null;
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
