import { createRouter, createWebHistory } from 'vue-router';
import FashionLayoutTest from '@/views/admin/test/FashionLayoutTest.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/test/fashion-layout',
      name: 'FashionLayoutTest',
      component: FashionLayoutTest
    }
  ]
});

export default router;