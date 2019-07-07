/* eslint-disable no-param-reassign,import/no-cycle */
import { get } from 'lodash';
import TasksService from '../services/tasks.service';

const initialState = {
  myPosted: [],
  appliedFor: [],
  workingOn: [],
  reviewing: [],
  selectedTask: {},
  selectedTaskApplications: [],
  selectedApplication: {},
};

const actions = {
  /**
   * Create new task
   * @param commit
   * @param {Object} data - task data
   * @param {String} data.title - task title
   * @param {String} data.description - task description
   * @param {Number} data.price - task price
   * @param {Number} data.worktime - task work time
   * @param {Boolean} data.published - task published
   * @return {Promise<void>}
   */
  async create({ commit }, data) {
    const res = await TasksService.create(data);

    commit('addMyPosted', res.data.data);
  },

  /**
   * Update task
   * @param commit
   * @param {Number} id - task ID
   * @param {Object} data - task data
   * @return {Promise<void>}
   */
  async update({ commit }, { id, data }) {
    const res = await TasksService.update(id, data);

    commit('updateMyPosted', {
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
    await TasksService.delete(id);

    commit('deleteMyTask', id);
  },

  /**
   * @return {Promise<void>}
   */
  async loadMyTasks({ commit }) {
    const tasks = await TasksService.getMyTasks();

    commit('setMyPosted', tasks.data.data.created);
    commit('setWorkingOn', tasks.data.data.workingOn);
    commit('setAppliedFor', tasks.data.data.appliedFor);
  },

  /**
   * Get selected task and commit it to state
   * @param commit
   * @param {Number} taskId - task ID
   * @return {Promise<void>}
   */
  async selectTask({ commit }, taskId) {
    const task = await TasksService.getTask(taskId);

    commit('setSelectedTask', task.data.data);
  },

  /**
   * Apply for task
   * @param commit
   * @param {Number} taskId
   * @return {Promise<void>}
   */
  async applyForTask({ commit }, taskId) {
    try {
      const application = await TasksService.applyForWork(taskId);

      commit('addTaskApplication', application.data.data);
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
    const application = await TasksService.getApplication(applicationId);

    commit('setSelectedApplication', application.data.data);
  },
};

const mutations = {
  /**
   * Set my posted tasks
   * @param state
   * @param {Array} tasks
   */
  setMyPosted(state, tasks) {
    state.myPosted = tasks;
  },

  /**
   * Add one my posted task
   * @param state
   * @param {Object} taskData
   */
  addMyPosted(state, taskData) {
    state.myPosted.push(taskData);
  },

  /**
   * Remove task from list of my posted tasks
   * @param state
   * @param {Number} id
   */
  deleteMyTask(state, id) {
    const index = state.myPosted.findIndex(t => t.id === id);

    if (index > -1) {
      state.myPosted.splice(1, index);
    }
  },

  /**
   * Update already posted task
   * @param state
   * @param id
   * @param taskData
   */
  updateMyPosted(state, { id, taskData }) {
    const index = state.myPosted.findIndex(t => t.id === id);

    if (index > -1) {
      state.myPosted[index] = Object.assign({}, state.myPosted[index], taskData);
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
   * @param {Array} applications - list of task applications
   */
  setSelectedTask(state, { task, applications }) {
    state.selectedTask = task;
    state.selectedTaskApplications = applications;
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
