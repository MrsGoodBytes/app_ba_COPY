import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Check from '../views/Check.vue'
import Apply from '../views/Apply.vue'

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
  },
  {
    path: '/apply',
    name: 'Apply',
    component: Apply
  }
]

const router = new VueRouter({
  routes
})

export default router
