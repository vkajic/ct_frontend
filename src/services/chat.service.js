/* eslint-disable import/no-cycle */
import { set } from 'lodash';
import apiService from './api.service';

class ChatService {
  /**
   * Get chat messages for task application
   * @param {Number} applicationId
   * @param {Number} [lastId] - last id already loaded (optional)
   * @return {*}
   */
  getMessages(applicationId, lastId) {
    const options = {};

    if (lastId) {
      set(options, 'params.lastId', lastId);
    }

    return apiService.get(`/messages/${applicationId}`, options);
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

  /**
   * Get application ids with unread messages
   * @return {*}
   */
  getUnreadMessages() {
    return apiService.get('/messages/unread');
  }

  /**
   * Set application messages as read
   * @param {Number} applicationId
   * @return {*}
   */
  readMessages(applicationId) {
    return apiService.put(`/messages/read/${applicationId}`, {});
  }

  /**
   * Get attachment thumbnail signed url
   * @param {Number} messageId
   * @param {Number} attachmentId
   * @return {*}
   */
  getAttachmentThumbnail(messageId, attachmentId) {
    return apiService.get(`/messages/${messageId}/attachment/${attachmentId}`, {
      params: {
        thumbnail: true,
      },
    });
  }

  /**
   * Get attachment signed url
   * @param {Number} messageId
   * @param {Number} attachmentId
   * @return {*}
   */
  getAttachmentUrl(messageId, attachmentId) {
    return apiService.get(`/messages/${messageId}/attachment/${attachmentId}`);
  }
}

export default new ChatService();
