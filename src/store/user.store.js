/* eslint-disable import/no-cycle */
import apiService from '../services/api.service';
import tokenService from '../services/token.service';

const initialState = {
  token: null,
  user: null,
  loginError: null,
  registrationError: null,
  registrationRole: null,
  activeRole: null,
  bcDataSet: false,
};

const actions = {
  /**
   * Init auth data (token and user) from local storage and API
   * @param commit
   * @param state
   * @param dispatch
   */
  async init({ commit, state, dispatch }) {
    // check if there is token already in store
    if (!state.token) {
      const token = tokenService.getToken();

      // If token exists set header
      if (token) {
        apiService.setHeader();

        commit('setToken', token);
      } else {
        throw new Error('Token not found');
      }
    }

    this._vm.$smartContract.getKeypairs();
    this._vm.$smartContract.createBcData()
      .then(() => {
        commit('activateBcData');
      });

    // check if there is stored user already
    if (!state.user && state.token) {
      try {
        const user = await apiService.get('/users/me');
        const userData = user.data.data;

        commit('setUser', userData);

        // set tawk data
        if (this._vm.$Tawk) {
          this._vm.$Tawk.$updateChatUser({
            name: userData.name,
            email: userData.email,
          });
        }

        // check if profile exists and if does not redirect to profile wizard
        const firstRole = userData.roles[0].name;

        commit('setActiveRole', firstRole);

        dispatch('chat/getThreads', null, { root: true });
      } catch (err) {
        tokenService.removeToken();
        apiService.removeHeader();
        commit('setToken', null);
        commit('setUser', null);

        throw new Error('User not authenticated');
      }
    }

    return true;
  },

  /**
   * Login user
   * @param commit
   * @param dispatch
   * @param rootState
   * @param {Object} credentials
   * @return {Promise<*>}
   */
  async login({ commit, dispatch, rootState }, credentials) {
    const login = await apiService.post('/auth/login', credentials);
    commit('setToken', login.data.data.token);

    tokenService.saveToken(login.data.data.token);
    apiService.setHeader();

    const user = await apiService.get('/users/me');
    const userData = user.data.data;

    commit('setUser', userData);

    // set tawk data
    if (this._vm.$Tawk) {
      this._vm.$Tawk.$updateChatUser({
        name: userData.name,
        email: userData.email,
      });
    }

    // check if profile exists and if does not redirect to profile wizard
    const firstRole = userData.roles[0].name;

    commit('setActiveRole', firstRole);

    dispatch('chat/getThreads', null, { root: true });

    this._vm.$smartContract.createKeypairs(credentials);
    this._vm.$smartContract.createBcData()
      .then(async () => {
        commit('activateBcData');

        try {
          if (user.data.data.freelancer != null
            && user.data.data.freelancer.name && user.data.data.freelancer.bcId == null) {
            const bcFreelancer = await this._vm
              .$smartContract
              .setFreelancerProperties(user.data.data.freelancer, rootState.util.activeLanguage);
            const resBc = await apiService.put('/freelancers/regBcFreelancer', bcFreelancer);
            console.log(bcFreelancer);
            console.log(resBc.data.message);
          } else if (user.data.data.client != null
            && user.data.data.client.name && user.data.data.client.bcId == null) {
            const bcClient = await this._vm
              .$smartContract
              .setClientProperties(user.data.data.client, rootState.util.activeLanguage);
            const resBc = await apiService.put('/clients/regBcClient', bcClient);
            console.log(bcClient);
            console.log(resBc.data.message);
          }
        } catch (e) {
          console.log(e);
        }
      });

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
    commit('setToken', null);

    tokenService.removeToken();
    this._vm.$smartContract.removeKeypairs();
    apiService.removeHeader();

    commit('setUser', null);
    commit('removeActiveRole');
  },

  /**
   * Update freelancer basic data
   * @param commit
   * @param state
   * @param {Object} data
   * @return {Promise<void>}
   */
  async updateFreelancerBasicInfo({ commit, state }, data) {
    const freelancerData = await apiService.put('/freelancers', data.data);

    commit('setFreelancerBasicData', freelancerData.data.data);

    if (data.caller === 'update') {
      try {
        this._vm.$smartContract.setEditFreelancerProperties(state.user.freelancer)
          .then(async (bcFreelancer) => {
            const resBc = await apiService.put('/freelancers/regBcEditFreelancer', bcFreelancer);
            console.log(bcFreelancer);
            console.log(resBc.data.message);
          });
      } catch (e) {
        console.log(e);
      }
    }
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
   * Update client basic data
   * @param commit
   * @param rootState
   * @param state
   * @param {Object} data
   * @return {Promise<void>}
   */
  async updateClientBasicInfo({ commit, rootState, state }, data) {
    const clientData = await apiService.put('/clients', data.data);

    commit('setClientBasicData', clientData.data.data);

    if (data.caller === 'create') {
      try {
        this._vm.$smartContract
          .setClientProperties(state.user.client, rootState.util.activeLanguage)
          .then(async (bcClient) => {
            const resBc = await apiService.put('/clients/regBcClient', bcClient);
            console.log(bcClient);
            console.log(resBc.data.message);
          });
      } catch (e) {
        console.log(e);
      }
    } else if (data.caller === 'update') {
      try {
        this._vm.$smartContract.setEditClientProperties(state.user.client)
          .then(async (bcClient) => {
            const resBc = await apiService.put('/clients/regBcEditClient', bcClient);
            console.log(bcClient);
            console.log(resBc.data.message);
          });
      } catch (e) {
        console.log(e);
      }
    }
  },

  /**
   * Publish freelancer profile
   * @param commit
   * @param rootState
   * @param state
   * @return {Promise<void>}
   */
  async publishFreelancerProfile({ commit, rootState, state }) {
    await apiService.put('/freelancers/publish');

    commit('setFreelancerPublished');

    try {
      this._vm.$smartContract
        .setFreelancerProperties(state.user.freelancer, rootState.util.activeLanguage)
        .then(async (bcFreelancer) => {
          const resBc = await apiService.put('/freelancers/regBcFreelancer', bcFreelancer);
          console.log(bcFreelancer);
          console.log(resBc.data.message);
        });
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * Subscribe user to newsletter
   * @param commit
   * @param status
   * @return {Promise<void>}
   */
  async newsletterToggleSubscription({ commit }, status) {
    const res = await apiService.post('/users/toggle-subscription', {
      subscribed: status,
    });

    commit('setUserEmailSubscription', res.data.data);
  },

  /**
   * Delete user
   * @param commit
   * @param dispatch
   * @return {Promise<void>}
   */
  async removeUser({ dispatch }) {
    await apiService.delete('/users');
    dispatch('logout');
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

  /**
   * When bcData is set then set this flag to true for other components to know
   * @param state
   */
  activateBcData(state) {
    state.bcDataSet = true;
  },

  /**
   * Update user newsletter subscription status
   * @param state
   * @param status
   */
  setUserEmailSubscription(state, status) {
    if (state.user) {
      state.user = Object.assign({}, state.user, { emailSubscribed: status });
    }
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

  /**
   * Check if current user has completed his profile with required fields
   * @param state
   */
  isUserCompleted(state) {
    const { activeRole } = state;
    return state.user && state.user[activeRole] && state.user[activeRole].name;
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
