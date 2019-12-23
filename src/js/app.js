import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from '../components/App.vue'
import Signin from '../components/Signin.vue'
import TodoBody from "../components/TodoBody.vue";
import '../scss/todo-body.css'
import '../scss/app.scss';
import '../scss/dashboard.css'
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import 'bootstrap'
import 'webpack-jquery-ui';
import 'webpack-jquery-ui/css';
Vue.use(VueRouter)
Vue.use(Vuex) // Vuex requires Promise. If your supporting browsers do not implement Promise (e.g. IE), you can use a polyfill library, such as es6-promise.

const routes = [
  { path: '/signin', component: Signin },
  { path: '/', component: TodoBody }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

const store = new Vuex.Store({
  state: {
    user: {
      userId: 'userId-default-value',
      login: false
    }
  },
  mutations: {
    login (state, payload) {
      state.user.userId = payload.userId
      state.user.login = payload.login
    }
  }
})

const app = new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
}).$mount('#app')