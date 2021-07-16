import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/index.vue'),
      meta: {
        isRedirectIfLoggedIn: true,
      },
    },
    {
      path: '/result',
      name: 'ListResult',
      component: () => import('@/views/result/list/index.vue'),
      meta: {
        isRedirectIfLoggedIn: true,
      },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('@/views/auth/profile/index.vue'),
      meta: {
        isRedirectIfLoggedIn: true,
      },
    },
    {
      path: '/exam/:id',
      name: 'Exam',
      component: () => import('@/views/exam/index.vue'),
      meta: {
        isRedirectIfLoggedIn: true,
        layout: 'full',
      },
    },
    {
      path: '/second-page',
      name: 'second-page',
      component: () => import('@/views/SecondPage.vue'),
      meta: {
        pageTitle: 'Second Page',
        breadcrumb: [
          {
            text: 'Second Page',
            active: true,
          },
        ],
        isRedirectIfLoggedIn: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/login/index.vue'),
      meta: {
        layout: 'full',
        isRedirectIfLoggedIn: false,
      },
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})
// Check token khi chuyển route
router.beforeEach((to, _, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.isRedirectIfLoggedIn) {
    if (!token) {
      store.commit('removeAuthentication')
      return next({ name: 'login' })
    }
  }
  if (to.meta.isRedirectIfLoggedIn === false) {
    if (token) {
      return next({ name: 'home' })
    }
  }
  return next()
})
export default router
