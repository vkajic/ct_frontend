/* eslint-disable import/no-cycle */
import apiService from './api.service';

class UserService {
  /**
   * Update current user
   * @return {*}
   */
  updateMe(data) {
    return apiService.put('/users/me', data);
  }

  /**
   * Update users password
   * @param {Object} data
   * @param {String} data.oldPassword
   * @param {String} data.newPassword
   * @param {String} data.newPasswordConfirmation
   * @return {*}
   */
  updatePassword(data) {
    return apiService.put('/users/password', data);
  }
}

export default new UserService();
