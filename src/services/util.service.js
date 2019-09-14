/* eslint-disable import/no-cycle */
import apiService from './api.service';

class UtilService {
  /**
   * Get all skills
   * @return {*}
   */
  getSkills() {
    return apiService.get('/users/skills');
  }

  /**
   * Get all languages
   * @return {*}
   */
  getLanguages() {
    return apiService.get('/users/languages');
  }

  /**
   * Delete file
   * @param {Number} fileId
   * @param {String} type
   * @return {*}
   */
  deleteFile(fileId, type) {
    return apiService.delete(`files/${fileId}`, {
      params: {
        type,
      },
    });
  }
}

export default new UtilService();
