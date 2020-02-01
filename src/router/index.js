import VueRouter from 'vue-router'
import Vue from 'vue'
import Routes from './routes'

Vue.use(VueRouter)
const router = new VueRouter({
    mode: 'history',
    'routes': Routes
})

export default router;