/* eslint-disable import/no-cycle */
import apiService from './api.service';

class TasksService {
  /**
   * Create new task
   * @param {Object} data - task data
   * @param {String} data.title - task title
   * @param {String} data.description - task description
   * @param {Number} data.price - task price
   * @param {Number} data.worktime - task work time
   * @param {Boolean} data.published - is task published
   * @return {*}
   */
  create(data) {
    return apiService.post('/tasks', data);
  }

  /**
   * Update task details
   * @param {Number} taskId
   * @param {Object} data - task data
   * @return {*}
   */
  update(taskId, data) {
    return apiService.put(`/tasks/${taskId}`, data);
  }

  /**
   * Delete task
   * @param {Number} taskId
   * @return {*}
   */
  delete(taskId) {
    return apiService.delete(`/tasks/${taskId}`);
  }

  /**
   * Search tasks
   * @param {String} q - query term
   * @param {Object} sort
   * @param {String} sort.by - field to sort by
   * @param {'asc'|'desc'} sort.dir - sort direction, asc or desc
   * @return {*}
   */
  search(q, sort) {
    return apiService.get('/tasks/search', {
      params: {
        q,
        sortBy: sort.by,
        sortDir: sort.dir,
      },
    });
  }

  /**
   * Get single task details
   * @param taskId
   * @return {*}
   */
  getTask(taskId) {
    return apiService.get(`/tasks/${taskId}`);
  }

  /**
   * Apply for work on task
   * @param {Number} taskId
   * @return {*}
   */
  applyForWork(taskId) {
    return apiService.post(`/tasks/${taskId}/apply`);
  }

  /**
   * Get current users tasks (created by, working on etc...)
   * @return {*}
   */
  getMyTasks() {
    return apiService.get('/tasks/my');
  }

  /**
   * Transform blockchain task stage to textual status
   * @param {Number} stage
   * @return {string}
   */
  getTaskStatus(stage) {
    let status;

    switch (stage) {
      case 0:
        status = 'posted';
        break;
      case 1:
        status = 'cryptotasker applied';
        break;
      case 2:
        status = 'has solution';
        break;
      case 3:
        status = 'dispute started';
        break;
      case 4:
        status = 'dispute commited';
        break;
      case 5:
        status = 'cancelled';
        break;
      case 6:
        status = 'accepted';
        break;
      case 7:
        status = 'client late';
        break;
      case 8:
        status = 'cryptotasker won';
        break;
      case 9:
        status = 'cryptotasker late';
        break;
      case 10:
        status = 'client won';
        break;
      default:
        status = '';
    }

    return status;
  }

  /**
   * Get task application
   * @param applicationId
   * @return {*}
   */
  getApplication(applicationId) {
    return apiService.get(`/applications/${applicationId}`);
  }
}

export default new TasksService();
