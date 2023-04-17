import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized
} from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ProfileView from '@/views/ProfileView.vue'
import { useSession } from '@/models/session'
import StatisticsView from '@/views/StatisticsView.vue'
import FriendActivity from '@/views/FriendActivity.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      beforeEnter: secureRoute
    },

    {
      path: '/statistics',
      name: 'statistics',
      component: StatisticsView,
      beforeEnter: secureRoute
    },
    {
      path: '/friends',
      name: 'friends',
      component: FriendActivity,
      beforeEnter: secureRoute
    },
    {
      path: '/admin/users',
      name: 'admin-list-users',
      component: () => import('@/views/admin/UsersList.vue'),
      beforeEnter: requiresAdmin,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/users/edit/:id?',
      name: 'admin-edit-user',
      component: () => import('@/views/admin/UsersEdit.vue'),
      beforeEnter: requiresAdmin,
      meta: { requiresAuth: true }
    }
  ]
})

export default router

function secureRoute(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const session = useSession()
  if (session.user) {
    next()
  } else {
    next('/login')
  }
}

function requiresAdmin(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const session = useSession()
  if (session.user && to.meta.requiresAuth && session.user.isAdmin) {
    next()
  } else {
    next('/')
  }
}
