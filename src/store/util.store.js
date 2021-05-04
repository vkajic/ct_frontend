import orderBy from 'lodash/orderBy';
import sortBy from 'lodash/sortBy';
import apiService from '../services/api.service';
import extract from '../lib/extractLanguage';

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

const gtrs = {
  /**
   * Get all skills without categories
   * @param state
   * @param getters
   */
  getAllSkills(state, getters) {
    const currentLanguage = getters.getCurrentLanguage;
    const skills = [];

    if (currentLanguage) {
      state.skills.forEach((c) => {
        skills.push(...c.skills);
      });

      return extract(skills, currentLanguage.id);
    }

    return [];
  },

  /**
   * Get currently active language record
   * @param state
   * @return {Object}
   */
  getCurrentLanguage(state) {
    return state.languages.find(l => l.code === state.activeLanguage);
  },

  /**
   * Get categories with flat translations
   * @param state
   * @param getters
   */
  getCategories(state, getters) {
    const currentLanguage = getters.getCurrentLanguage;

    if (currentLanguage) {
      const cats = extract(state.skills, currentLanguage.id);

      return orderBy(cats, 'name');
    }

    return [];
  },

  /**
   * Get skills by category Id
   * @param state
   * @param getters
   * @return {function(*): *}
   */
  getSkillsByCategory: (state, getters) => (categoryId) => {
    const skills = getters.getAllSkills.filter(s => s.categoryId === categoryId);

    return sortBy(
      orderBy(
        skills,
        'name',
        'asc',
      ),
      skill => (skill.name === 'Other' ? 1 : 0),
    );
  },

  /**
   * Get skills by selected category IDs
   * @param state
   * @param getters
   * @return {function(*): *}
   */
  getSkillsByCategories: (state, getters) => (categoryIds) => {
    const skills = getters.getAllSkills.filter(s => categoryIds.indexOf(s.categoryId) > -1);

    if (skills.length) {
      return sortBy(
        orderBy(
          skills,
          'name',
          'asc',
        ),
        skill => (skill.name === 'Other' ? 1 : 0),
      );
    }

    return [];
  },
};

const store = {
  namespaced: true,
  state: initialState,
  mutations,
  actions,
  getters: gtrs,
};

export default store;
