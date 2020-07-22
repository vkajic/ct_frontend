import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import Vuelidate from 'vuelidate';
import VueSocketIO from 'vue-socket.io';
import CKEditor from '@ckeditor/ckeditor5-vue';
import VueGtag from 'vue-gtag';
import Tawk from 'vue-tawk';
import App from './App.vue';
import router from './router';
import store from './store';
import ApiService from './services/api.service';
import SmartContract from './services/smartContract.service';
import i18n from './i18n';

import './assets/scss/style.scss';
import MainLayout from './layouts/main/MainLayout.vue';
import ProfileLayout from './layouts/profile/ProfileLayout.vue';
import AuthLayout from './layouts/auth/AuthLayout.vue';

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

Vue.component('main-layout', MainLayout);
Vue.component('profile-layout', ProfileLayout);
Vue.component('auth-layout', AuthLayout);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
