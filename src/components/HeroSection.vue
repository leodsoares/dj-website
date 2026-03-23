<template>
  <section class="hero">
    <canvas ref="canvasRef" class="dither-canvas" width="800" height="800" />

    <div class="hero-content">
      <p class="hero-eyebrow">Tech House &middot; Bass House &middot; Open Format</p>
      <h1 class="hero-title">
        <span class="t2">Leo</span>
        <span class="t3">Soares</span>
      </h1>
      <div class="hero-footer">
        <p class="hero-tagline">
          <FontAwesomeIcon :icon="['fas', 'location-dot']" />
          Vancouver, B.C
        </p>
        <a href="#events" class="hero-cta">View Events &rarr;</a>
      </div>
    </div>

    <div class="hero-socials">
      <a href="#" class="social-btn" target="_blank" rel="noopener noreferrer" aria-label="SoundCloud" @mouseenter="onMove" @mousemove="onMove" @mouseleave="onLeave">
        <FontAwesomeIcon :icon="['fab', 'soundcloud']" style="font-size: 22px;" />
      </a>
      <a href="#" class="social-btn" target="_blank" rel="noopener noreferrer" aria-label="Instagram" @mouseenter="onMove" @mousemove="onMove" @mouseleave="onLeave">
        <!-- Instagram -->
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
        </svg>
      </a>
      <a href="#contact" class="social-btn" aria-label="Contact" @mouseenter="onMove" @mousemove="onMove" @mouseleave="onLeave">
        <!-- Contact -->
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      </a>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
let animId = null

// Bayer ordered-dither 8×8 matrix (values 0–63)
const BAYER_8 = [
  [ 0,32, 8,40, 2,34,10,42],
  [48,16,56,24,50,18,58,26],
  [12,44, 4,36,14,46, 6,38],
  [60,28,52,20,62,30,54,22],
  [ 3,35,11,43, 1,33, 9,41],
  [51,19,59,27,49,17,57,25],
  [15,47, 7,39,13,45, 5,37],
  [63,31,55,23,61,29,53,21],
]

function drawDitheredOrb() {
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  const W = canvas.width, H = canvas.height
  const cx = W / 2, cy = H / 2
  const maxR = Math.min(W, H) * 0.85

  const img = ctx.createImageData(W, H)
  const d = img.data

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const dx = x - cx, dy = y - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      const t = Math.min(dist / maxR, 1)
      const intensity = Math.pow(1 - t, 1.6)
      const threshold = BAYER_8[y & 7][x & 7] / 64 + (Math.random() * 0.06 - 0.03)

      if (intensity > threshold) {
        // Bright primary pink #cd2bcc
        const i = (y * W + x) * 4
        d[i]     = 205
        d[i + 1] = 43
        d[i + 2] = 204
        d[i + 3] = Math.round(255 * Math.min(intensity * 1.4, 1))
      }
    }
  }

  ctx.putImageData(img, 0, 0)
}

function startBreathe() {
  let s = 1, dir = 1
  function tick() {
    s += 0.00025 * dir
    if (s > 1.04) dir = -1
    if (s < 0.96) dir =  1
    canvasRef.value.style.transform = `translate(-50%, -50%) scale(${s})`
    animId = requestAnimationFrame(tick)
  }
  tick()
}

function onMove(e) {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width) * 100
  const y = ((e.clientY - rect.top) / rect.height) * 100
  e.currentTarget.style.setProperty('--x', `${x}%`)
  e.currentTarget.style.setProperty('--y', `${y}%`)
}

function onLeave(e) {
  e.currentTarget.style.removeProperty('--x')
  e.currentTarget.style.removeProperty('--y')
}

onMounted(() => {
  drawDitheredOrb()
  startBreathe()
})

onUnmounted(() => {
  if (animId) cancelAnimationFrame(animId)
})
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 140px 48px 100px;
  overflow: hidden;
}

/* Sparse grid lines */
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(205, 43, 204, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(205, 43, 204, 0.04) 1px, transparent 1px);
  background-size: 64px 64px;
  pointer-events: none;
}

.dither-canvas {
  position: absolute;
  top: 50%;
  left: 55%;
  transform: translate(-50%, -50%);
  width: 780px;
  height: 780px;
  pointer-events: none;
  opacity: 0.9;
  mix-blend-mode: screen;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 1100px;
}

.hero-eyebrow {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--primary);
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  gap: 16px;
  opacity: 0;
  animation: fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
}

.hero-eyebrow::before {
  content: '';
  display: block;
  width: 28px;
  height: 1px;
  background: var(--primary);
  flex-shrink: 0;
}

.hero-title {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: clamp(72px, 13vw, 172px);
  line-height: 0.88;
  letter-spacing: -0.025em;
  text-transform: uppercase;
}

.hero-title .t1 {
  display: block;
  color: var(--surface);
  opacity: 0;
  animation: fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
}

.hero-title .t2 {
  display: block;
  color: var(--surface);
  opacity: 0;
  animation: fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.45s forwards;
}

.hero-title .t3 {
  display: block;
  color: var(--primary);
  opacity: 0;
  animation: fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards;
}

.hero-footer {
  display: flex;
  align-items: flex-end;
  gap: 64px;
  margin-top: 56px;
  opacity: 0;
  animation: fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.85s forwards;
}

.hero-tagline {
  font-size: 22px;
  color: var(--muted);
  line-height: 1.7;
  max-width: 300px;
  font-weight: 300;
}

.hero-cta {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  padding: 16px 36px;
  background: var(--primary);
  color: var(--surface);
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s, background 0.2s;
  white-space: nowrap;
  flex-shrink: 0;
}

.hero-cta::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.25) 1px, transparent 1px);
  background-size: 4px 4px;
  opacity: 0;
  transition: opacity 0.25s;
}

.hero-cta:hover { background: #a81fa7; transform: translateY(-2px); }
.hero-cta:hover::after { opacity: 1; }

.hero-socials {
  position: relative;
  z-index: 2;
  display: flex;
  gap: 12px;
  margin-top: 32px;
  opacity: 0;
  animation: fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 1.05s forwards;
}

.social-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 88px;
  height: 60px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: var(--muted);
  text-decoration: none;
  transition: color 0.2s, border-color 0.2s;
  /* For circles instead, change to: border-radius: 50%; */
}

.social-btn::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(205, 43, 204, 0.4), transparent 70%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.social-btn:hover {
  color: var(--surface);
  border-color: rgba(255, 255, 255, 0.6);
}

.social-btn:hover::after { opacity: 1; }

.scroll-hint {
  position: absolute;
  bottom: 40px;
  right: 48px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--muted);
  writing-mode: vertical-rl;
  display: flex;
  align-items: center;
  gap: 10px;
  animation: floatY 3.5s ease-in-out infinite;
}

.scroll-hint::after {
  content: '';
  display: block;
  width: 1px;
  height: 36px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.25), transparent);
}


@media (max-width: 768px) {
  .hero { padding: 110px 24px 80px; }
  .hero-footer { flex-direction: column; align-items: flex-start; gap: 28px; }
  .scroll-hint { display: none; }
  .dither-canvas { width: 400px; height: 400px; left: 50%; }
}
</style>
