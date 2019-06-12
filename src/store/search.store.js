/* eslint-disable no-param-reassign */
import tasksService from '../services/tasks.service';

const initialState = {
  sort: {
    by: 'timePosted',
    dir: 'desc',
  },
  queryTerm: null,
  tasks: [],
  total: 0,
};

const mutations = {
  /**
   * Set query term for search
   * @param state
   * @param {String} term
   */
  setQueryTerm(state, term) {
    state.queryTerm = term;
  },

  /**
   * Set search results
   * @param state
   * @param {Object} results - search result data
   * @param {Array} results.hits - search result items
   * @param {Number} results.total - total number of items
   */
  setSearchResults(state, { hits, total }) {
    state.tasks = hits;
    state.total = total;
  },

  /**
   * Update sort properties
   * @param state
   * @param {String} by - sort by
   */
  changeSort(state, by) {
    if (by === state.sort.by) {
      state.sort = Object.assign({}, state.sort, {
        dir: state.sort.dir === 'asc' ? 'desc' : 'asc',
      });
    } else {
      state.sort = {
        by,
        dir: 'asc',
      };
    }
  },
};

const actions = {
  /**
   * Run search
   * @param commit
   * @param state
   * @param {String} [term] - search term (optional)
   * @return {Promise<void>}
   */
  async runSearch({ commit, state }, term) {
    try {
      commit('setQueryTerm', term);

      const searchResults = await tasksService.search(term, state.sort);

      commit('setSearchResults', searchResults.data.data);
    } catch (err) {
      throw err;
    }
  },

  /**
   * On sort change update results
   * @param commit
   * @param state
   * @param {String} by - sort by field
   * @return {Promise<void>}
   */
  async changeSort({ commit, state }, by) {
    commit('changeSort', by);

    const searchResults = await tasksService.search(state.queryTerm, state.sort);

    commit('setSearchResults', searchResults.data.data);
  },
};

const getters = {
  /**
   * Checks if there is more tasks to load, used for lazy load button
   * @param state
   * @return {boolean}
   */
  isThereMoreToLoad(state) {
    return state.total > state.tasks.length;
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
