const TOKEN_KEY = 'access_token';
const KEYPAIRS_KEY = 'keypairs_key';

const TokenService = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  saveToken(accessToken) {
    localStorage.setItem(TOKEN_KEY, accessToken);
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  },

  getKeypairs() {
    return JSON.parse(localStorage.getItem(KEYPAIRS_KEY));
  },

  saveKeypairs(keypairs) {
    localStorage.setItem(KEYPAIRS_KEY, JSON.stringify(keypairs));
  },

  removeKeypairs() {
    localStorage.removeItem(KEYPAIRS_KEY);
  },
};

export default TokenService;
