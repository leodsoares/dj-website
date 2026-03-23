<template>
  <div class="page-bg" ref="bgRef">
    <img :src="headshot" alt="" class="page-bg-img" />
  </div>
  <NavBar />
  <RouterView v-slot="{ Component, route }">
    <Transition :name="transitionName" mode="out-in">
      <component :is="Component" :key="route.path" />
    </Transition>
  </RouterView>
  <SiteFooter />
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'
import SiteFooter from './components/SiteFooter.vue'
import headshot from './assets/headshot3.jpg'

const route = useRoute()
const prevOrder = ref(0)

const transitionName = computed(() => {
  const order = route.meta?.order ?? 0
  const name = order >= prevOrder.value ? 'slide-left' : 'slide-right'
  prevOrder.value = order
  return name
})

const bgRef = ref(null)

function onScroll() {
  if (bgRef.value) {
    bgRef.value.style.transform = `translateY(${window.scrollY * 0.4}px)`
  }
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style>
/* Slide transitions */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease;
  position: absolute;
  width: 100%;
}

.slide-left-enter-from  { transform: translateX(60px);  opacity: 0; }
.slide-left-leave-to    { transform: translateX(-60px); opacity: 0; }
.slide-right-enter-from { transform: translateX(-60px); opacity: 0; }
.slide-right-leave-to   { transform: translateX(60px);  opacity: 0; }

.page-bg {
  position: fixed;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  will-change: transform;
}

.page-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  mask-image:
    linear-gradient(to left, rgba(0,0,0,0.65) 30%, transparent 100%),
    linear-gradient(to bottom, transparent 0%, black 8%, black 90%, transparent 100%);
  mask-composite: intersect;
  -webkit-mask-image:
    linear-gradient(to left, rgba(0,0,0,0.65) 30%, transparent 100%),
    linear-gradient(to bottom, transparent 0%, black 8%, black 90%, transparent 100%);
  -webkit-mask-composite: source-in;
  opacity: 0.75;
}
</style>
