/* eslint-disable no-param-reassign,import/no-cycle */
import { get, set } from 'lodash';
import ApiService from '../services/api.service';

const initialState = {
  myTasks: [],
  appliedFor: [],
  workingOn: [],
  reviewing: [],
  selectedTask: {},
  selectedTaskApplications: [],
  selectedApplication: null,
  feedbackModalDisplayed: false,
};

const actions = {
  /**
   * Create new task
   * @param commit
   * @param {Object} data - task data
   * @param {String} data.title - task title
   * @param {String} data.description - task description
   * @param {Number} data.price - task price
   * @param {Number} data.duration - task work time
   * @param {Boolean} data.published - task published
   * @return {Promise<void>}
   */
  async create({ commit }, data) {
    const newData = await this._vm.$smartContract.setTaskProperties(data);
    const res = await ApiService.post('/tasks', newData);

    commit('addMyTask', res.data.data);
  },

  /**
   * Update task
   * @param commit
   * @param {Number} id - task ID
   * @param {Object} data - task data
   * @return {Promise<void>}
   */
  async update({ commit }, { id, data }) {
    const res = await ApiService.put(`/tasks/${id}`, data);

    commit('updateMyTask', {
      id,
      taskData: res.data.data,
    });
  },

  /**
   * Delete my own task
   * @param commit
   * @param {Number} id
   * @return {Promise<void>}
   */
  async delete({ commit }, id) {
    await ApiService.delete(`/tasks/${id}`);

    commit('deleteMyTask', id);
  },

  /**
   * @return {Promise<void>}
   */
  async loadMyTasks({ commit }, options) {
    const params = { ...options };

    const tasks = await ApiService.get('/tasks/my', {
      params,
    });

    commit('setMyTasks', tasks.data.data);
  },

  /**
   * Get selected task and commit it to state
   * @param commit
   * @param {Number} taskId - task ID
   * @return {Promise<void>}
   */
  async selectTask({ commit }, taskId) {
    const task = await ApiService.get(`/tasks/${taskId}`);

    commit('setSelectedTask', task.data.data);
  },

  /**
   * Apply for task
   * @param commit
   * @param {Number} taskId
   * @param letter
   * @return {Promise<void>}
   */
  async applyForTask({ commit }, { taskId, letter }) {
    try {
      const application = await ApiService.post('/applications', {
        taskId,
        letter,
      });

      commit('addTaskApplication', application.data.data);

      return application.data.data;
    } catch (err) {
      throw err;
    }
  },

  /**
   * Get application and set it to store
   * @param commit
   * @param {Number} applicationId
   * @return {Promise<void>}
   */
  async getApplication({ commit }, applicationId) {
    const application = await ApiService.get(`/applications/${applicationId}`);

    commit('setSelectedApplication', application.data.data);
  },

  /**
   * Accept freelancers application
   * @param commit
   * @param {Object} application
   * @return {Promise<void>}
   */
  async hire({ commit }, application) {
    await ApiService.put(`/applications/${application.id}/hire`);

    commit('setApplicationHired', application);
  },

  /**
   * Reopen task
   * @param commit
   * @param {Object} task
   * @return {Promise<void>}
   */
  async reopen({ commit }, task) {
    await ApiService.put(`/tasks/${task.id}/reopen`);

    commit('setTaskReopened');
  },
};

const mutations = {
  /**
   * Set my posted tasks
   * @param state
   * @param {Array} tasks
   */
  setMyTasks(state, tasks) {
    state.myTasks = tasks;
  },

  /**
   * Add one my posted task
   * @param state
   * @param {Object} taskData
   */
  addMyTask(state, taskData) {
    state.myTasks.push(taskData);
  },

  /**
   * Remove task from list of my posted tasks
   * @param state
   * @param {Number} id
   */
  deleteMyTask(state, id) {
    const index = state.myTasks.findIndex(t => t.id === id);

    if (index > -1) {
      state.myTasks.splice(1, index);
    }
  },

  /**
   * Update already posted task
   * @param state
   * @param id
   * @param taskData
   */
  updateMyTask(state, { id, taskData }) {
    const index = state.myTasks.findIndex(t => t.id === id);

    if (index > -1) {
      state.myTasks[index] = Object.assign({}, state.myTasks[index], taskData);
    }
  },

  /**
   * Set tasks user is working on
   * @param state
   * @param tasks
   */
  setWorkingOn(state, tasks) {
    state.workingOn = tasks;
  },

  /**
   * Set selected task data
   * @param state
   * @param {Object} task - task data
   */
  setSelectedTask(state, task) {
    state.selectedTask = task;
  },

  /**
   * Add new application to selected task applications
   * @param state
   * @param {Object} application
   */
  addTaskApplication(state, application) {
    state.selectedTaskApplications.push(application);
  },

  /**
   * Set tasks user applied for
   * @param state
   * @param {Array} tasks
   */
  setAppliedFor(state, tasks) {
    state.appliedFor = tasks;
  },

  /**
   * Add task to applied ones
   * @param state
   * @param {Object} task - task data
   */
  addAppliedTask(state, task) {
    state.appliedFor.push(task);
  },

  /**
   * Set selected application to store
   * @param state
   * @param {Object} application
   */
  setSelectedApplication(state, application) {
    state.selectedApplication = application;
  },

  /**
   * Accept freelancers application, set status to accepted (1)
   * @param state
   * @param {Object} application
   */
  setApplicationHired(state, application) {
    if (state.selectedTask) {
      const index = state.selectedTask.applications.findIndex(a => a.id === application.id);

      if (index > -1) {
        set(state, ['selectedTask', 'applications', index, 'status'], 1);
      }
    }
  },

  setClientApplicationStatus(state, { applicationId, status }) {
    if (state.selectedTask) {
      const index = state.selectedTask.applications
        .findIndex(a => a.id === applicationId);

      if (index > -1) {
        set(state, ['selectedTask', 'applications', index, 'status'], status);
      }
    }
  },

  setClientApplicationFeedback(state, { applicationId, feedback }) {
    if (state.selectedTask) {
      const index = state.selectedTask.applications
        .findIndex(a => a.id === applicationId);

      if (index > -1) {
        set(state, ['selectedTask', 'applications', index, 'feedback'], feedback);
      }
    }
  },

  setFreelancerApplicationStatus(state, status) {
    if (state.selectedApplication) {
      set(state, ['selectedApplication', 'status'], status);
    }
  },

  setFreelancerApplicationFeedback(state, feedback) {
    if (state.selectedApplication) {
      set(state, ['selectedApplication', 'feedback'], feedback);
    }
  },

  /**
   * Close feedback modal window
   * @param state
   */
  closeFeedbackModal(state) {
    state.feedbackModalDisplayed = false;
  },

  /**
   * Open feedback modal
   * @param state
   */
  openFeedbackModal(state) {
    state.feedbackModalDisplayed = true;
  },

  /**
   * Reopen selected task
   * @param state
   */
  setTaskReopened(state) {
    if (state.selectedTask) {
      set(state, 'selectedTask.status', 2);
    }
  },
};

const getters = {
  /**
   * Check if current user can apply for current task
   * @param state
   * @param otherGetters
   * @param rootState
   * @return {boolean|*}
   */
  canApplyForTask(state, otherGetters, rootState) {
    const currentUser = get(rootState, 'user.user');
    const { selectedTask, selectedTaskApplications } = state;

    return !!currentUser
      && !!selectedTask
      && selectedTask.postedBy !== currentUser.id
      && !selectedTaskApplications.length;
  },

  /**
   * Check if current user has applied for selected task
   * @param state
   * @param otherGetters
   * @param rootState
   * @return {boolean}
   */
  appliedForTask(state, otherGetters, rootState) {
    const currentUser = get(rootState, 'user.user');
    const { selectedTask, selectedTaskApplications } = state;

    return !!currentUser
      && !!selectedTask
      && selectedTask.postedBy !== currentUser.id
      && selectedTaskApplications.length;
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
