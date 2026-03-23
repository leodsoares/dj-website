<template>
  <div class="page-bg" ref="bgRef">
    <img :src="headshot" alt="" class="page-bg-img" />
  </div>
  <NavBar />
  <HeroSection />
  <EventsSection />
  <PastShowsSection />
  <SiteFooter />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import EventsSection from './components/EventsSection.vue'
import PastShowsSection from './components/PastShowsSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import headshot from './assets/headshot3.jpg'

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
