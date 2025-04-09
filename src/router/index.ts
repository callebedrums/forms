import { createRouter, createWebHistory } from 'vue-router'
import FormsListView from '../views/FormsListView.vue'
import FormAnswerView from '../views/FormAnswerView.vue'
import FormEditView from '../views/FormEditView.vue'

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
      props: true
    },
    {
      path: '/:id/edit',
      name: 'form-edit',
      component: FormEditView
    }
  ],
})

export default router
