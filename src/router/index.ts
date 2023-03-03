import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { useUserStore } from '~/store/modules/user'

export const Layout = () => import('~/views/layout/index.vue')

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('~/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        component: () => import('~/views/index/index.vue'),
        name: 'index',
        meta: { title: '首页' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (userStore.token === '' && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})

export default router
