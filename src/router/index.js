import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Check from '../views/Check.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/check',
    name: 'Check',
    component: Check
  }
]

const router = new VueRouter({
  routes
})

export default router
