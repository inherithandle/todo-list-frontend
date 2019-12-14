import Vue from 'vue'
import App from '../components/App.vue'
import '../scss/todo-body.css'
import '../scss/app.scss';
import '../scss/dashboard.css'
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import 'webpack-jquery-ui';
import 'webpack-jquery-ui/css';
new Vue({
  el: '#app',
  render: h => h(App)
})