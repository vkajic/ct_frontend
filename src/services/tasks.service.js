/* eslint-disable import/no-cycle */
import apiService from './api.service';

class TasksService {
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
}

export default new TasksService();
