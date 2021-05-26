import Vue from 'vue'
import App from './App.vue'

//added
import { router } from './router';
import store from './store';
import 'bootstrap'; // bootstrap with CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// import VeeValidate from 'vee-validate';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);
//END added

Vue.config.productionTip = false

//added
Vue.component('font-awesome-icon', FontAwesomeIcon); // icons (used in nav)

new Vue({
  router, //added - store for Vuex (implemented in src/store)
  store, //added - router for Vue Router (implemented in src/router.js)
  render: h => h(App),
}).$mount('#app')

