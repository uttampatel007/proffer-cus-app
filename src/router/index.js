import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabPage from '../views/TabPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/tabs',
  },
  {
    path: '/customer/address',
    component: () => import('@/views/address/CustomerAddress.vue'),
    name: "customerAddress"
  },
  {
    path: '/business/profile/:businessId',
    name: "businessProfile",
    component: () => import('@/views/business/BusinessProfile.vue'),
  },
  {
    path: '/tabs/',
    component: TabPage,
    children: [
      {
        path: '',
        redirect: '/tabs/home'
      },
      {
        path: 'home',
        component: () => import('@/views/home/HomeView.vue')
      },
      {
        path: 'coupon',
        component: () => import('@/views/coupon/CouponView.vue')
      },
      {
        path: 'setting',
        component: () => import('@/views/setting/SettingView.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
