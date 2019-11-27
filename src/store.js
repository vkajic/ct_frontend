/* eslint-disable import/no-cycle */
import Vue from 'vue';
import Vuex from 'vuex';

import ui from './store/ui.store';
import search from './store/search.store';
import tasks from './store/tasks.store';
import user from './store/user.store';
import chat from './store/chat.store';
import util from './store/util.store';
import freelancers from './store/freelancers.store';
import messages from './store/messages.store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ui,
    search,
    tasks,
    user,
    chat,
    util,
    freelancers,
    messages,
  },
});
