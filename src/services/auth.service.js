import apiService from './api.service';

class AuthService {
  /**
   * Register
   * @param {Object} data
   * @return {*}
   */
  register(data) {
    return apiService.post('auth/register', data);
  }

  /**
   * Login to backend
   * @param {Object} credentials
   * @param {String} credentials.email - user email address
   * @param {String} credentials.password - user password
   * @return {Promise<*>}
   */
  login(credentials) {
    return apiService.post('auth/login', credentials);
  }

  /**
   * Confirm email address
   * @param {String} hash - email confirmation hash
   * @return {*}
   */
  confirmEmail(hash) {
    return apiService.post('auth/email-confirm', { hash });
  }

  /**
   * Get current user
   * @return {*}
   */
  getMe() {
    return apiService.get('users/me');
  }
}

export default new AuthService();
