import { createRouter, createWebHistory } from '@ionic/vue-router';

const routes = [
  {
    path: '/',
    redirect: '/customer/address',
  },
  {
    path: '/customer/address',
    component: () => import('@/views/address/CustomerAddress.vue'),
    name: "customerAddress"
  },
  {
    path: '/home',
    component: () => import('@/views/home/HomeView.vue'),
    name: "home"
  },
  {
    path: '/business/profile/:businessId',
    name: "businessProfile",
    component: () => import('@/views/business/BusinessProfile.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
