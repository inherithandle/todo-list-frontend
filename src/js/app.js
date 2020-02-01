import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Router from '../router/index'
import Store from '../store/index'
import App from '../components/App.vue'
import ApiLocal from './api-local'
import ApiDev from './api-dev'
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '../scss/todo-body.css'
import '../scss/app.scss';
import '../scss/dashboard.css'
import 'webpack-jquery-ui';
import 'webpack-jquery-ui/css';
if (process.env.NODE_ENV == 'production') {
  Vue.prototype.$api = ApiDev
} else if (process.env.NODE_ENV == 'development') {
  Vue.prototype.$api = ApiDev
} else {
  Vue.prototype.$api = ApiLocal
}
Vue.prototype.$eventHub = new Vue(); // Global event bus
Vue.use(BootstrapVue)

const app = new Vue({
  el: '#app',
  render: h => h(App),
  router: Router,
  store: Store
})