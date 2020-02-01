import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Router from '../router/index.js'
import Vuex from 'vuex'
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
Vue.use(Vuex) // Vuex requires Promise. If your supporting browsers do not implement Promise (e.g. IE), you can use a polyfill library, such as es6-promise.


const store = new Vuex.Store({
  state: {
    user: {
      userId: 'userId-default-value',
      login: false
    },
    modalTodo: {
      projectNo: 0,
      text: '',
      id: 0,
      dueDate: '',
      projects: []
    }
  },
  mutations: {
    login (state, payload) {
      state.user.userId = payload.userId
      state.user.login = payload.login
    },
    modalTodo(state, payload) {
      state.modalTodo.projectNo = payload.projectNo
      state.modalTodo.text = payload.text
      state.modalTodo.id = payload.id
      state.modalTodo.dueDate = payload.dueDate
      state.modalTodo.projects = payload.projects
    }
  }
})

const app = new Vue({
  el: '#app',
  render: h => h(App),
  'router': Router,
  store
})