import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import PastShowsPage from '../pages/PastShowsPage.vue'

const routes = [
  { path: '/',            component: HomePage,      meta: { order: 0 } },
  { path: '/past-shows',  component: PastShowsPage, meta: { order: 1 } },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
