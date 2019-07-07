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
}

export default new UtilService();
