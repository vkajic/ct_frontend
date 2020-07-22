import apiService from '../services/api.service';

/* eslint-disable no-param-reassign */
const initialState = {
  skills: [],
  languages: [],
  activeLanguage: 'en',
};

const actions = {
  /**
   * Get skills from service and set them if not already set
   * @param commit
   * @param state
   * @return {Promise<void>}
   */
  async getSkills({ commit, state }) {
    if (!state.skills.length) {
      const skills = await apiService.get('/utils/categories');
      commit('setSkills', skills.data.data);
    }
  },

  /**
   * Get languages from service and set them if not already set
   * @param commit
   * @param state
   * @return {Promise<void>}
   */
  async getLanguages({ commit, state }) {
    if (!state.languages.length) {
      const languages = await apiService.get('/utils/languages');
      commit('setLanguages', languages.data.data);
    }
  },

  /**
   * Set active language
   * @param commit
   * @param language
   * @return {Promise<void>}
   */
  async setActiveLanguage({ commit }, language) {
    localStorage.setItem('language', language);
    apiService.setHeader();
    commit('setActiveLanguage', language);
  },
};

const mutations = {
  /**
   * Set skills to store
   * @param state
   * @param {Array} skills
   */
  setSkills(state, skills) {
    state.skills = skills;
  },

  /**
   * Set languages to store
   * @param state
   * @param {Array} languages
   */
  setLanguages(state, languages) {
    state.languages = languages;
  },

  /**
   * Set currently active language
   * @param state
   * @param language
   */
  setActiveLanguage(state, language) {
    if (state.activeLanguage !== language) {
      state.activeLanguage = language;
    }
  },
};

const getters = {
  /**
   * Get all skills without categories
   * @param state
   */
  getAllSkills(state) {
    const skills = [];

    state.skills.forEach((c) => {
      skills.push(...c.skills);
    });

    return skills;
  },

  /**
   * Get currently active language record
   * @param state
   * @return {Object}
   */
  getCurrentLanguage(state) {
    return state.languages.find(l => l.code === state.activeLanguage);
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
