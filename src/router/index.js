import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import { auth } from '../firebase'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import( /* webpackChunkName: "login" */ '../views/Login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import( /* webpackChunkName: "register" */ '../views/Register.vue')
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import( /* webpackChunkName: "settings" */ '../views/Settings.vue'),
      meta: {
        requiresAuth: true
      }
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router