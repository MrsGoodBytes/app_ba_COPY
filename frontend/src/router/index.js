import Vue from 'vue'
import VueRouter from 'vue-router'
import Check from '../views/Check.vue'
import Apply from '../views/Apply.vue'
import Ge from '../components/Ge.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/check',
        name: 'Check',
        component: Check
    },
    {
        path: '/',
        name: 'Apply',
        component: Apply
    },
    {
        path: '/ge',
        name: 'Ge',
        component: Ge
    },
]

const router = new VueRouter({
    routes
})

export default router