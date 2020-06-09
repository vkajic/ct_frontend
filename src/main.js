import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import Vuelidate from 'vuelidate';
import VueSocketIO from 'vue-socket.io';
import CKEditor from '@ckeditor/ckeditor5-vue';
import VueGtag from 'vue-gtag';
import Tawk from 'vue-tawk';
import VueI18n from 'vue-i18n';
import App from './App.vue';
import router from './router';
import store from './store';
import ApiService from './services/api.service';
import SmartContract from './services/smartContract.service';

import './assets/scss/style.scss';

Vue.use(BootstrapVue);
Vue.use(Vuelidate);
Vue.use(new VueSocketIO({
  debug: process.env.NODE_ENV === 'development',
  connection: process.env.VUE_APP_API_URL,
  vuex: {
    store,
    actionPrefix: 'socket_',
    mutationPrefix: 'socket_',
  },
}));
Vue.use(CKEditor);
Vue.use(VueI18n);

if (process.env.NODE_ENV !== 'development') {
  Vue.use(VueGtag, {
    config: { id: process.env.VUE_APP_GTAG },
  }, router);

  Vue.use(Tawk, {
    tawkSrc: process.env.VUE_APP_TAWK_SRC,
  });
}

Vue.config.productionTip = false;

Vue.config.devtools = process.env.NODE_ENV === 'development';

// Set the base URL of the API
ApiService.init(process.env.VUE_APP_API_URL, store);

// load smart contract utility service
Vue.prototype.$smartContract = SmartContract;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
