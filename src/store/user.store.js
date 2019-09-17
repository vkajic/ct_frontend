/* eslint-disable import/no-cycle */
import tokenService from '../services/token.service';
import apiService from '../services/api.service';
import router from '../router';

const initialState = {
  token: null,
  user: null,
  loginError: null,
  registrationError: null,
};

const actions = {
  /**
   * Init auth data (token and user) from local storage and API
   * @param commit
   * @param state
   */
  async init({ commit, state }) {
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
    if (!state.user) {
      try {
        const user = await apiService.get('/users/me');
        const userData = user.data.data;

        commit('setUser', userData);

        // check if profile exists and if does not redirect to profile wizard
        const firstRole = userData.roles[0].name;
        if (!userData[firstRole]) {
          router.replace(`/create-${firstRole}/basic-info`);
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
  async login({ commit }, credentials) {
    const login = await apiService.post('/auth/login', credentials);
    commit('setToken', login.data.data.token);

    tokenService.saveToken(login.data.data.token);
    apiService.setHeader();

    const user = await apiService.get('/users/me');
    commit('setUser', user.data.data);

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
    commit('setToken', null);
    commit('setUser', null);

    tokenService.removeToken();
    apiService.removeHeader();

    router.replace('/login');
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
};

const mutations = {
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
   * Set freelancer basic data
   * @param state
   * @param data
   */
  setFreelancerBasicData(state, data) {
    state.user.freelancer = Object.assign({}, data);
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
