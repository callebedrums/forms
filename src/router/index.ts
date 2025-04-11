import { createRouter, createWebHistory } from 'vue-router';
import FormsListView from '../formManager/FormsListView.vue';
import FormManagerView from '../formManager/FormManagerView.vue';
import FormAnswerView from '../formAnswer/FormAnswerView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'forms-list',
      component: FormsListView,
    },
    {
      path: '/:id',
      name: 'form-answer',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: FormAnswerView,
      props: true,
    },
    {
      path: '/:id/edit',
      name: 'form-edit',
      component: FormManagerView,
      props: route => ({ id: route.params.id, tab: route.query.tab || '' })
    },
  ],
});

export default router;
