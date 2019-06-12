/* eslint-disable no-param-reassign */
import ChatService from '../services/chat.service';

const initialState = {
  messages: [],
};

const actions = {
  /**
   * Get messages from API
   * @param commit
   * @param {Number} applicationId
   * @return {Promise<void>}
   */
  async getMessages({ commit }, applicationId) {
    const messages = await ChatService.getMessages(applicationId);

    commit('setMessages', messages.data.data);
  },
  socket_connect({ rootState }) {
    const { token } = rootState.user;

    if (token) {
      this._vm.$socket.emit('authenticate', { token });
    }
  },

  /**
   * Add new message to store
   * @param commit
   * @param message
   */
  socket_messageSent({ commit }, message) {
    commit('addMessage', message);
  },

  /**
   * Send new message and push it to messages array in state
   * @param commit
   * @param {String} text
   * @param {Number} applicationId
   */
  async sendMessage({ commit }, { text, applicationId }) {
    const message = await ChatService.sendMessage(applicationId, text);

    commit('addMessage', message.data.data);
  },
};

const mutations = {
  /**
   * Set messages to state
   * @param state
   * @param {Array} messages
   */
  setMessages(state, messages) {
    state.messages = messages;
  },

  /**
   * Add message to state
   * @param state
   * @param {Object} message
   */
  addMessage(state, message) {
    state.messages.push(message);
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
