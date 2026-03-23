import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import PastShowsPage from '../pages/PastShowsPage.vue'
import ContactPage from '../pages/ContactPage.vue'

const routes = [
  { path: '/',            component: HomePage,      meta: { order: 0 } },
  { path: '/past-shows',  component: PastShowsPage, meta: { order: 1 } },
  { path: '/contact',     component: ContactPage,   meta: { order: 2 } },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return new Promise(resolve => {
        setTimeout(() => resolve({ el: to.hash, behavior: 'smooth' }), 100)
      })
    }
    return { top: 0 }
  },
})
