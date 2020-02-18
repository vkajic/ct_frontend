/* eslint-disable no-param-reassign */
import apiService from '../services/api.service';

const initialState = {
  sort: {
    by: 'timePosted',
    dir: 'desc',
  },
  category: null,
  queryTerm: null,
  tasks: [],
  page: 1,
  perPage: 20,
  total: 0,
  sortOptions: [
    {
      key: 'timePosted',
      label: 'Date Added',
    },
    /* {
      key: 'location',
      label: 'Location',
    }, */
    {
      key: 'price',
      label: 'Price',
    },
  ],
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
   * @param {Array} hits - search result items
   */
  setTasks(state, hits) {
    state.tasks = hits;
  },

  /**
   * Set total num of items
   * @param state
   * @param total
   */
  setTotal(state, total) {
    state.total = total;
  },

  /**
   * Add more tasks
   * @param state
   * @param tasks
   */
  addTasks(state, tasks) {
    state.tasks = [...state.tasks, ...tasks];
  },

  /**
   * Update sort properties
   * @param state
   * @param {String} by - sort by
   */
  setSort(state, by) {
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

  /**
   * Set search category
   * @param state
   * @param category
   */
  setCategory(state, category) {
    state.category = category;
  },

  /**
   * Reset page count
   * @param state
   */
  resetPage(state) {
    state.page = 1;
  },

  /**
   * Increase page number for infinite load
   * @param state
   */
  increasePage(state) {
    if (state.total > (state.page * state.perPage)) {
      state.page += 1;
    }
  },
};

const actions = {
  /**
   * Run search
   * @param commit
   * @param state
   * @return {Promise<void>}
   */
  async runSearch({ commit, state }) {
    try {
      const params = {
        sortBy: state.sort.by,
        sortDir: state.sort.dir,
        q: state.queryTerm,
        category: state.category,
        page: state.page,
        perPage: state.perPage,
      };

      const res = await apiService.get('/tasks/search', { params });

      commit('setTasks', res.data.data.hits);
      commit('setTotal', res.data.data.total.value);
    } catch (err) {
      throw err;
    }
  },

  /**
   * Lazy load more tasks
   * @param state
   * @param commit
   * @return {Promise<void>}
   */
  async nextTasks({ state, commit }) {
    if (state.total > (state.page * state.perPage)) {
      commit('increasePage');
      const params = {
        sortBy: state.sort.by,
        sortDir: state.sort.dir,
        q: state.queryTerm,
        category: state.category,
        page: state.page,
        perPage: state.perPage,
      };

      try {
        const res = await apiService.get('/tasks/search', { params });
        commit('addTasks', res.data.data.hits);
        commit('setTotal', res.data.data.total.value);
      } catch (err) {
        throw err;
      }
    }
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
