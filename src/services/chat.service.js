/* eslint-disable import/no-cycle */
import apiService from './api.service';

class ChatService {
  /**
   * Get chat messages for task application
   * @param {Number} applicationId
   * @return {*}
   */
  getMessages(applicationId) {
    return apiService.get(`/messages/${applicationId}`);
  }

  /**
   * Send new message to API
   * @param {Number} applicationId
   * @param {String} text
   * @return {*}
   */
  sendMessage(applicationId, text) {
    return apiService.post(`/messages/${applicationId}`, { text });
  }
}

export default new ChatService();
