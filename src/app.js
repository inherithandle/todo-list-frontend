import Vue from 'vue'
import { ModalPlugin } from 'bootstrap-vue'
import { ButtonPlugin } from 'bootstrap-vue'
import { FormSelectPlugin } from 'bootstrap-vue'
import { AlertPlugin } from 'bootstrap-vue'
import Router from './router'
import Store from './store'
import App from './App.vue'
import ApiLocal from './api/api-local'
import ApiDev from './api/api-dev'
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import 'bootstrap/dist/css/bootstrap.css'
import './scss/todo-body.css'
import './scss/dashboard.css'
import 'webpack-jquery-ui/datepicker';
import 'webpack-jquery-ui/css';
if (process.env.NODE_ENV == 'production') {
  Vue.prototype.$api = ApiDev
} else if (process.env.NODE_ENV == 'development') {
  Vue.prototype.$api = ApiDev
} else {
  Vue.prototype.$api = ApiLocal
}
Vue.prototype.$eventHub = new Vue(); // Global event bus
Vue.use(ModalPlugin)
Vue.use(ButtonPlugin)
Vue.use(FormSelectPlugin)
Vue.use(AlertPlugin)

const app = new Vue({
  el: '#app',
  render: h => h(App),
  router: Router,
  store: Store
})