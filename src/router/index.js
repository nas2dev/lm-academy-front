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
          meta: {
            unauthorized: true,
          },
        },
        {
          path: '/register',
          name: 'Register',
          component: import('@/views/Auth/RegisterView.vue'),
          meta: {
            unauthorized: true,
          },
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
          meta: {
            isAuthorized: true,
          },
        },
        {
          path: 'users-lists',
          name: 'DashboardUserList',
          component: () => import('@/views/Dashboard/UsersList.vue'),
          meta: {
            isAuthorized: true,
          },
        },
        {
          path: 'send-registration-invite',
          name: 'SendRegistrationInvite',
          component: () => import('@/views/Dashboard/SendRegistrationInviteView.vue'),
          meta: {
            forAdmin: true,
            isAuthorized: true,
          },
        },
        {
          path: 'admin/courses',
          name: 'CourseAdmin',
          component: () => import('@/views/Dashboard/Admin/CourseAdminView.vue'),
          meta: {
            forAdmin: true,
            isAuthorized: true,
          },
        },
        {
          path: 'user/courses',
          name: 'CourseUser',
          component: () => import('@/views/Dashboard/User/CourseUserView.vue'),
          meta: {
            forUser: true,
            isAuthorized: true,
          },
        },
      ],
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const isAuthenticated = localStorage.getItem('lm-access-token')
  let isUserLoggedIn = userStore?.isUserLoggedIn
  let storeUser = userStore?.user

  console.log('storeUser', storeUser)

  if (isAuthenticated) {
    // If user is authenticated and wants to visit an unauthorized route like 'login' or 'register' then redirect to elemeinate confusion
    if (to.meta.unauthorized) {
      next({ name: 'Dashboard' })
      return
    }

    if (Object.keys(storeUser).length === 0) {
      try {
        const user = await fetchCurrentUser()
        console.log('user', user)
        console.log('user', user.user)
        userStore.setUser(user.user)
        storeUser = user.user
        isUserLoggedIn = true
      } catch (error) {
        console.error('Error fetching user:', error)
        // Handle the error appropriately, maybe redirect to login
        return next({ name: 'Login' })
      }
    }

    if (to.meta.forAdmin) {
      // check if auth user has admin role
      // console.log('user-role: ', storeUser?.roles[0]?.name)

      const isAdmin = storeUser?.roles[0]?.name == 'Admin'

      if (!isAdmin) {
        return next({ name: 'Dashboard' })
      }
    }

    if (to.meta.forUser) {
      const isUser = storeUser?.roles[0]?.name == 'User'

      if (!isUser) {
        return next({ name: 'Dashboard' })
      }
    }
  }

  if (!isAuthenticated && to.meta.isAuthorized) {
    // cancel the navigation and redirect the user to homepage
    return next({ name: 'home' })
  }

  return next()
})

export default router
