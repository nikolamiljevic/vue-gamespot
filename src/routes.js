import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './components/home/Index.vue'
import Signin from './components/signin/Index.vue'
import Dashboard from './components/dashboard/Index.vue'
import MainDashboard from './components/dashboard/main.vue'
import AddPosts from './components/dashboard/AddPosts.vue'
import PostsList from './components/dashboard/ListPosts.vue'

import store from './store/store'

Vue.use(VueRouter)

const authGuard = {
    beforeEnter: (to, from, next) => {

        const redirect = () => {
            if(store.state.admin.token){
               if (to.path === '/signin') {
                next('/dashboard')
               } else {
                next()
               }
            }else{
               if (to.path === '/signin') {
                next()
               } else {
                next('/')
               }
            }
        }

        if(store.state.admin.refreshLoading) {
            store.watch((state, getters) => getters['admin/refreshLoading'], () => {
                redirect();
            })
        } else {
            redirect()
        }

    }
}

const routes = [
    { path: '/', component: Home },
    { path: '/signin', component: Signin },
    { path: '/dashboard',component: Dashboard,children:[
        {path:'/',component:MainDashboard},
        {path:'add_posts',component:AddPosts},
        {path:'posts_list',component:PostsList}
    ],...authGuard }
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