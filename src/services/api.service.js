import axios from 'axios';
import TokenService from './token.service';

class ApiService {
  init(baseURL, store) {
    axios.defaults.baseURL = baseURL;

    axios.interceptors.response.use(
      response => response,
      async (error) => {
        if (error.request.status === 401 && (
          error.response.data.error === 'token_not_provided'
          || error.response.data.error === 'invalid_token')
        ) {
          store.dispatch('user/logout');
          /* store.dispatch('ui/showNotification', {
            text: 'Unauthorized, please log in!',
            type: 'danger',
          }); */
        }

        throw error;
      },
    );
  }

  setHeader() {
    axios.defaults.headers.common.Authorization = `Bearer ${TokenService.getToken()}`;
  }

  removeHeader() {
    axios.defaults.headers.common = {};
  }

  get(resource, options) {
    return axios.get(resource, options);
  }

  post(resource, data, options) {
    return axios.post(resource, data, options);
  }

  put(resource, data, options) {
    return axios.put(resource, data, options);
  }

  delete(resource, options) {
    return axios.delete(resource, options);
  }

  /**
   * Perform a custom Axios request.
   *
   * data is an object containing the following properties:
   *  - method
   *  - url
   *  - data ... request payload
   *  - auth (optional)
   *    - username
   *    - password
   * */
  customRequest(data) {
    return axios(data);
  }
}

export default new ApiService();
