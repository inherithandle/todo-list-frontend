import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from '../components/App.vue'
import Signin from '../components/Signin.vue'
import Signup from '../components/Signup.vue'
import TodoBody from "../components/TodoBody.vue";
import SearchResult from '../components/SearchResult.vue'
import Summary from '../components/Summary.vue'
import Project from '../components/Project.vue'
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
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(Vuex) // Vuex requires Promise. If your supporting browsers do not implement Promise (e.g. IE), you can use a polyfill library, such as es6-promise.

const routes = [
  {
    path: '/',
    name: 'body',
    component: TodoBody,
    children: [
      {
        path: 'search',
        name: 'search',
        component: SearchResult,
        props: (route) => ({
          query: route.query.query
        }),
      },
      {
        path: '',
        name: 'summary',
        component: Summary,
        props: (route) => ({
          summaryIndex: route.query.summaryIndex,
          code: route.query.code
        }),
      },
      {
        path: 'project',
        name: 'project',
        component: Project,
        props: (route) => ({
          projectIndex: route.query.projectIndex
        }),
      }
    ]
  },
  {
    path: '/signin',
    name: 'signin',
    component: Signin,
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
  },
  {
    path: '/redirect-to-google',
    redirect: to => {
      let queryString = Object.keys(to.query).map(function(key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(to.query[key])
      }).join('&');
      window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${queryString}`
      return ''
    }
  }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

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
  router,
  store
}).$mount('#app')