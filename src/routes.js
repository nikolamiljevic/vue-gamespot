import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './components/home/Index.vue'
import Signin from './components/signin/Index.vue'
import Dashboard from './components/dashboard/Index.vue'
import Store from './store/store'

Vue.use(VueRouter)

const authGuard = {
    beforeEnter: (to, from, next) => {
        if(Store.state.admin.token){
            next()
        }else{
            next('/')
        }
    }
}

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/signin',
        component: Signin
    },
    {
        path: '/dashboard',
        component: Dashboard,children:[],...authGuard
    }
]

export default new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior(from,to,savedPosition){
       return {
           x: 0,
           y: 0
       }
    }
})