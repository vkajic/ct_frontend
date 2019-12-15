import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import Vuelidate from 'vuelidate';
import VueSocketIO from 'vue-socket.io';
import App from './App.vue';
import AsyncComputed from 'vue-async-computed'
import router from './router';
import store from './store';
import ApiService from './services/api.service';

import './assets/scss/style.scss';

Vue.use(BootstrapVue);
Vue.use(Vuelidate);
Vue.use(new VueSocketIO({
  debug: true,
  connection: process.env.VUE_APP_API_URL,
  vuex: {
    store,
    actionPrefix: 'socket_',
    mutationPrefix: 'socket_',
  },
}));
Vue.use(AsyncComputed);

Vue.config.productionTip = false;

Vue.config.devtools = process.env.NODE_ENV === 'development';

// Set the base URL of the API
ApiService.init(process.env.VUE_APP_API_URL, store);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
