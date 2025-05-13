import { useUserStore } from '@/stores/useUserStore'
import fetchCurrentUser from '@/utils/fetchCurrentUser'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'DefaultLayout',
      component: () => import('@/layouts/DefaultLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/HomePageView.vue'),
        },
        {
          path: 'privacy-policy',
          name: 'PrivacyPolicy',
          component: () => import('@/views/PrivacyPolicyView.vue'),
          meta: {
            visitor: true,
          },
        },
        {
          path: 'terms-of-service',
          name: 'TermsOfService',
          component: () => import('@/views/TermsOfServiceView.vue'),
          meta: {
            visitor: true,
          },
        },
        {
          path: 'contact',
          name: 'ContactPage',
          component: () => import('@/views/ContactPageView.vue'),
          meta: {
            visitor: true,
          },
        },
        {
          path: 'about-us',
          name: 'AboutUs',
          component: () => import('@/views/AboutUsView.vue'),
          meta: {
            visitor: true,
          },
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: import('@/views/Errors/NotFound.vue'),
    },
    {
      path: '/auth',
      name: 'AuthLayout',
      component: import('@/layouts/AuthLayout.vue'),
      children: [
        {
          path: '/login',
          name: 'Login',
          component: import('@/views/Auth/LoginView.vue'),
        },
        {
          path: '/register',
          name: 'Register',
          component: import('@/views/Auth/RegisterView.vue'),
        },
      ],
    },
    {
      path: '/dashboard',
      name: 'DashboardLayout',
      component: import('@/layouts/DashboardLayout.vue'),
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: import('@/views/Dashboard/DashboardView.vue'),
        },
        {
          path: 'users-lists',
          name: 'DashboardUserList',
          component: () => import('@/views/Dashboard/UsersList.vue'),
        },
        {
          path: 'send-registration-invite',
          name: 'SendRegistrationInvite',
          component: () => import('@/views/Dashboard/SendRegistrationInviteView.vue'),
          meta: { forAdmin: true },
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const localStorageToken = localStorage.getItem('lm-access-token')
  let isUserLoggedIn = userStore?.isUserLoggedIn
  let storeUser = userStore?.user

  console.log('storeUser', storeUser)

  if (localStorageToken && storeUser != undefined) {
    fetchCurrentUser().then((user) => {
      console.log('user', user)

      console.log('user', user.user)

      userStore.setUser(user.user)
      isUserLoggedIn = true
    })
  }
  return next()
})

export default router
