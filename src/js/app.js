import Vue from 'vue'
import App from '../components/App.vue'
import '../scss/todo-body.css'
import '../scss/app.scss';
import '../scss/dashboard.css'
new Vue({
  el: '#app',
  render: h => h(App)
})