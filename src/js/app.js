import Vue from 'vue'
import VueRouter from 'vue-router'
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

const routes = [
  { path: '/signin', component: Signin },
  { path: '/', component: TodoBody }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

const app = new Vue({
  el: '#app',
  render: h => h(App),
  router
}).$mount('#app')