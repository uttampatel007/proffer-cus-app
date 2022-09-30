import { createRouter, createWebHistory } from '@ionic/vue-router';
// import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/auth',
  },
  {
    path: '/auth',
    component: () => import('@/views/auth/AuthView.vue'),
  },
  {
    path: '/auth/generate-otp',
    component: () => import('@/views/auth/OTPAuth.vue'),
    name: "generate-otp"
  },
  {
    path: '/auth/validate-otp',
    component: () => import('@/views/auth/OTPValidate.vue'),
  },
  {
    path: '/business/create/',
    component: () => import('@/views/business/CreateBusiness.vue'),
    name: "create-business"
  },
  {
    path: '/business/address/create/',
    component: () => import('@/views/business/CreateBusinessAddress.vue'),
    name: "create-business-address"
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1Page.vue')
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2Page.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
