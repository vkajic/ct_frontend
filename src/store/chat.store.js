/* eslint-disable no-param-reassign */
import Vue from 'vue';
import {
  orderBy, set, get, groupBy,
} from 'lodash';
import apiService from '../services/api.service';

const initialState = {
  oldMessages: [],
  newMessages: [],
  unreadMessages: [],
  lastId: 0,
  total: 0,
  loading: false,
  threads: [],
};

const actions = {
  /**
   * Get messages from API
   * @param commit
   * @param state
   * @param {Number} applicationId
   * @return {Promise<void>}
   */
  async getMessages({ commit, state }, applicationId) {
    try {
      if (!applicationId) return;

      commit('setLoading', true);

      const options = {};

      if (state.lastId) {
        set(options, 'params.lastId', state.lastId);
      }

      const messages = await apiService.get(`/messages/${applicationId}`, options);

      commit('setMessages', messages.data.data);
      if (messages.data.data.messages.length) {
        commit('setLastId', messages.data.data.messages[messages.data.data.messages.length - 1].id);
      }
      commit('setLoading', false);
    } catch (err) {
      commit('setLoading', false);
      throw err;
    }
  },

  /**
   * Get list of all threads
   * @param commit
   * @return {Promise<void>}
   */
  async getThreads({ commit }) {
    const threads = await apiService.get('/messages/threads');
    commit('setThreads', threads.data.data);
  },

  /**
   * Socket hook
   * Triggered when "connect" event is emitted
   * @param rootState
   */
  socket_connect({ rootState }) {
    const { token } = rootState.user;

    // if logged in send "authenticate" event
    if (token) {
      this._vm.$socket.emit('authenticate', { token });
    }
  },

  /**
   * Some user came online
   * @param commit
   * @param {Object} user
   */
  socket_userOnline({ commit }, user) {
    commit('updateThreadsUser', user);
  },

  /**
   * Some user went offline
   * @param commit
   * @param {Object} user
   */
  socket_userOffline({ commit }, user) {
    commit('updateThreadsUser', user);
  },

  /**
   * Add new message to store
   * @param commit
   * @param message
   */
  socket_messageSent({ commit }, message) {
    commit('addMessage', message);
    commit('updateThreadLastMessage', message);
  },

  /**
   * When message is received through sockets add message to unread ones if
   * receiver is not already in that chat
   * @param commit
   * @param state
   * @param rootState
   * @param {Object} data
   * @param {Number} data.id - application id
   * @param {String} data.title - task title
   * @param {String} data.text - new message text
   * @param {Date} data.createdAt - new message created at date
   */
  socket_messageReceived({ commit, state, rootState }, data) {
    const existingIndex = state.unreadMessages.findIndex(m => m.id === data.id);
    const selectedApplicationId = get(rootState, 'tasks.selectedApplication.id');

    if (!selectedApplicationId || selectedApplicationId !== data.id) {
      if (
        existingIndex === -1
      ) {
        commit('addUnreadMessage', data);
      } else {
        commit('updateUnreadMessage', data);
      }
    }

    // emit message read if already in that chat
    if (selectedApplicationId === data.id) {
      this._vm.$socket.emit('messageRead', data.id);
    }

    commit('updateThreadLastMessage', data);
  },

  /**
   * Get list of application ids which have unread messages
   * @param commit
   * @return {Promise<void>}
   */
  async getUnreadMessages({ commit }) {
    const data = await apiService.get('/messages/unread');

    commit('setUnreadMessages', data.data.data);
  },

  /**
   * Set messages as read for selected application
   * @param commit
   * @param {Number} applicationId
   * @return {Promise<void>}
   */
  async readMessages({ commit }, applicationId) {
    await apiService.put(`/messages/read/${applicationId}`, {});

    commit('setReadMessages', applicationId);
  },
};

const mutations = {
  /**
   * Are messages loading
   * @param state
   * @param b
   */
  setLoading(state, b) {
    state.loading = b;
  },

  /**
   * Set messages to state
   * @param state
   * @param {Object} data
   * @param {Array} data.messages
   * @param {Number} data.total
   */
  setMessages(state, data) {
    if (state.lastId === 0) {
      state.oldMessages = data.messages;
      state.total = data.total;
    } else {
      state.oldMessages.push(...data.messages);
    }
  },

  /**
   * Set threads
   * @param state
   * @param threads
   */
  setThreads(state, threads) {
    state.threads = threads;
  },

  /**
   * Update user data in threads
   * Used for updating online/offline status
   * @param {Object} state
   * @param {Object} user
   */
  updateThreadsUser(state, user) {
    state.threads = state.threads.map((t) => {
      const { freelancer, client } = t;

      if (freelancer.user.id === user.id) {
        freelancer.user = user;
      }

      if (client.user.id === user.id) {
        client.user = user;
      }

      t.freelancer = freelancer;
      t.client = client;

      return t;
    });
  },

  /**
   * Update last message on thread
   * @param {Object} state
   * @param {Object} message
   */
  updateThreadLastMessage(state, message) {
    state.threads = state.threads.map((t) => {
      if (t.id === message.applicationId) {
        t.lastMessage = message;
      }

      return t;
    });
  },

  /**
   * Add message to state
   * @param state
   * @param {Object} message
   */
  addMessage(state, message) {
    state.newMessages.push(message);
  },

  /**
   * Remove messages
   * @param state
   */
  resetMessages(state) {
    state.oldMessages = [];
    state.newMessages = [];
    state.lastId = 0;
    state.total = 0;
  },

  /**
   * Set last message id
   * @param state
   * @param {Number} lastId
   */
  setLastId(state, lastId) {
    state.lastId = lastId;
  },

  /**
   * Set total num of messages for pagination
   * @param state
   * @param {Number} total
   */
  setTotal(state, total) {
    state.total = total;
  },

  /**
   * Set list of unread messages
   * @param state
   * @param {Array} items
   */
  setUnreadMessages(state, items) {
    state.unreadMessages = items;
  },

  /**
   * Add new unread message
   * @param state
   * @param {Object} data
   * @param {Number} data.id - application id
   * @param {String} data.title - task title
   * @param {String} data.text - new message text
   * @param {Date} data.createdAt - new message created at date
   */
  addUnreadMessage(state, data) {
    state.unreadMessages.push(data);
  },

  /**
   * Update unread message with new data
   * @param state
   * @param {Object} data
   * @param {Number} data.id - application id
   * @param {String} data.title - task title
   * @param {String} data.text - new message text
   * @param {Date} data.createdAt - new message created at date
   */
  updateUnreadMessage(state, data) {
    const index = state.unreadMessages.findIndex(m => m.id === data.id);

    if (index > -1) {
      Vue.set(state.unreadMessages, index, data);
    }
  },

  /**
   * Remove application from unread messages array
   * @param state
   * @param {Number} applicationId
   */
  setReadMessages(state, applicationId) {
    const index = state.unreadMessages.findIndex(m => m.id === applicationId);

    if (index > -1) {
      state.unreadMessages.splice(index, 1);
    }
  },
};

const getters = {
  /**
   * Get count of unread messages
   * @param state
   * @return {number}
   */
  getNumberOfUnreadMessages(state) {
    return state.unreadMessages.length;
  },

  /**
   * Get old and new messages for display
   * @param state
   * @return {*[]}
   */
  getAllMessages(state) {
    return [...state.oldMessages, ...state.newMessages];
  },

  /**
   * Get messages sorted by ID (newest on bottom)
   * @param state
   * @param getters
   * @return {Array}
   */
  // eslint-disable-next-line no-shadow
  getMessagesSorted(state, getters) {
    return orderBy(getters.getAllMessages, ['id', 'asc']);
  },

  /**
   * Get number of messages left to load for this chat
   * @param state
   */
  getMessagesLeft(state) {
    return state.total - state.oldMessages.length;
  },

  /**
   * Get threads grouped by task ID
   * @param state
   */
  getGroupedThreads(state) {
    const { threads } = state;

    return groupBy(threads, 'taskId');
  },

  /**
   * Get all grouped threads for task
   * @param state
   * @return {Object}
   */
  getTaskGroupedThreads: state => (taskId) => {
    const { threads } = state;

    return groupBy(threads.filter(t => t.taskId === taskId), 'taskId');
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
