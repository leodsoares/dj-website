<template>
  <nav class="nav">
    <RouterLink to="/" class="nav-logo">
      <img src="/src/assets/logo2.png" alt="DJ Leo Soares" class="nav-logo-img" />
    </RouterLink>

    <ul class="nav-links">
      <li><RouterLink to="/">About</RouterLink></li>
      <li><RouterLink to="/#events">Events</RouterLink></li>
      <li><RouterLink to="/past-shows">Past Shows</RouterLink></li>
      <li><RouterLink to="/contact">Contact</RouterLink></li>
    </ul>

    <!-- Mobile hamburger -->
    <button class="hamburger" @click="open = true" aria-label="Open menu">
      <span /><span /><span />
    </button>
  </nav>

  <!-- Full-screen overlay -->
  <Transition name="overlay">
    <div v-if="open" class="menu-overlay">
      <button class="menu-close" @click="open = false" aria-label="Close menu">✕</button>
      <ul class="menu-links">
        <li><RouterLink to="/"          @click="open = false">About</RouterLink></li>
        <li><RouterLink to="/#events"   @click="open = false">Events</RouterLink></li>
        <li><RouterLink to="/past-shows" @click="open = false">Past Shows</RouterLink></li>
        <li><RouterLink to="/contact"   @click="open = false">Contact</RouterLink></li>
      </ul>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'
const open = ref(false)
</script>

<style scoped>
.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 24px 48px;
  background: linear-gradient(to bottom, rgba(7, 7, 11, 0.98) 60%, transparent);
  backdrop-filter: blur(2px);
}

.nav-logo {
  text-decoration: none;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.nav-logo-img {
  height: 105px;
  width: auto;
  filter: invert(1);
}

.nav-links {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 40px;
  list-style: none;
}

.nav-links a {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted);
  text-decoration: none;
  transition: color 0.2s;
  position: relative;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--primary);
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-links a:hover { color: var(--surface); }
.nav-links a:hover::after { width: 100%; }

/* Hamburger — hidden on desktop */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--surface);
  border-radius: 2px;
}

/* Full-screen overlay */
.menu-overlay {
  position: fixed;
  inset: 0;
  z-index: 300;
  background: rgba(7, 7, 11, 0.97);
  backdrop-filter: blur(16px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-close {
  position: absolute;
  top: 20px;
  right: 24px;
  background: none;
  border: none;
  color: var(--muted);
  font-size: 22px;
  cursor: pointer;
  transition: color 0.2s;
}

.menu-close:hover { color: var(--surface); }

.menu-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.menu-links a {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 36px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--muted);
  text-decoration: none;
  transition: color 0.2s;
}

.menu-links a:hover { color: var(--surface); }

/* Overlay transition */
.overlay-enter-active,
.overlay-leave-active { transition: opacity 0.25s ease; }
.overlay-enter-from,
.overlay-leave-to { opacity: 0; }

@media (max-width: 768px) {
  .nav { padding: 18px 24px; }
  .nav-links { display: none; }
  .nav-logo { display: none; }
  .hamburger { display: flex; }
}
</style>
