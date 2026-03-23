<template>
  <section class="past-shows" id="past-shows">
    <div class="past-shows-inner">
      <p class="section-label">Archive</p>
      <h2 class="section-title">Past Shows</h2>

      <div v-for="(events, year) in groupedEvents" :key="year" class="year-group">
        <div class="year-header">
          <span class="year-label">{{ year }}</span>
          <div class="year-line"></div>
        </div>

        <div class="event-list">
          <div
            v-for="ev in events"
            :key="ev.date.toISOString()"
            class="event-row"
            @mouseenter="onMove"
            @mousemove="onMove"
            @mouseleave="onLeave"
          >
            <div class="event-date">
              <div class="ev-day">{{ String(ev.date.getDate()).padStart(2, '0') }}</div>
              <div class="ev-mon">{{ MONTHS[ev.date.getMonth()].slice(0, 3).toUpperCase() }}</div>
            </div>

            <div class="event-info">
              <div class="ev-name">{{ ev.name }}</div>
              <div class="ev-venue">
                <strong>{{ ev.venue }}</strong> &middot; {{ ev.city }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]

const PAST_EVENTS = [
  { date: new Date(2025, 11, 31), name: 'New Year\'s Eve',        venue: 'Celebrities Nightclub', city: 'Vancouver, BC' },
  { date: new Date(2025, 10, 15), name: 'Frequency Vol. 4',       venue: 'Fortune Sound Club',    city: 'Vancouver, BC' },
  { date: new Date(2025, 9,  4),  name: 'Open Format Night',      venue: 'Bar None',              city: 'Vancouver, BC' },
  { date: new Date(2025, 7,  22), name: 'Summer Rooftop Series',  venue: 'Levels Nightclub',      city: 'Vancouver, BC' },
  { date: new Date(2025, 5,  14), name: 'Pride Weekend',          venue: 'Odyssey Nightclub',     city: 'Vancouver, BC' },
  { date: new Date(2025, 3,  19), name: 'Bimbo Punk Rock',        venue: 'Village Studios',       city: 'Vancouver, BC' },
  { date: new Date(2025, 1,   8), name: 'Frequency Vol. 3',       venue: 'Fortune Sound Club',    city: 'Vancouver, BC' },
  { date: new Date(2024, 11, 31), name: 'New Year\'s Eve',        venue: 'Celebrities Nightclub', city: 'Vancouver, BC' },
  { date: new Date(2024, 9,  26), name: 'Halloween Bash',         venue: 'Levels Nightclub',      city: 'Vancouver, BC' },
  { date: new Date(2024, 7,  10), name: 'Frequency Vol. 2',       venue: 'Fortune Sound Club',    city: 'Vancouver, BC' },
  { date: new Date(2024, 5,  22), name: 'Open Format Night',      venue: 'Bar None',              city: 'Vancouver, BC' },
  { date: new Date(2024, 2,  16), name: 'Frequency Vol. 1',       venue: 'Fortune Sound Club',    city: 'Vancouver, BC' },
  { date: new Date(2023, 11, 31), name: 'New Year\'s Eve',        venue: 'Celebrities Nightclub', city: 'Vancouver, BC' },
  { date: new Date(2023, 8,   9), name: 'Late Night Sessions',    venue: 'Bar None',              city: 'Vancouver, BC' },
  { date: new Date(2023, 5,  17), name: 'Pride Weekend',          venue: 'Odyssey Nightclub',     city: 'Vancouver, BC' },
]

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

const groupedEvents = computed(() => {
  const sorted = [...PAST_EVENTS].sort((a, b) => b.date - a.date)
  return sorted.reduce((acc, ev) => {
    const year = ev.date.getFullYear()
    if (!acc[year]) acc[year] = []
    acc[year].push(ev)
    return acc
  }, {})
})
</script>

<style scoped>
.past-shows {
  padding: 80px 0 120px;
  position: relative;
  background: rgba(7, 7, 11, 0.15);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-top: 1px solid rgba(255, 255, 255, 0.15);
}

.past-shows-inner {
  width: 100%;
  position: relative;
  z-index: 1;
  padding: 48px;
}

.section-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--primary);
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}

.section-label::after {
  content: '';
  display: block;
  width: 48px;
  height: 1px;
  background: var(--primary);
}

.section-title {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  font-size: clamp(36px, 5vw, 60px);
  letter-spacing: -0.02em;
  margin-bottom: 64px;
  line-height: 1;
}

.year-group {
  margin-bottom: 48px;
}

.year-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 12px;
}

.year-label {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.15em;
  color: var(--primary);
  text-transform: uppercase;
  flex-shrink: 0;
}

.year-line {
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.06);
}

.event-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.event-row {
  display: grid;
  grid-template-columns: 72px 1fr;
  align-items: center;
  gap: 32px;
  padding: 20px 28px;
  border: 1px solid rgba(255, 255, 255, 0.04);
  background: rgba(255, 255, 255, 0.015);
  position: relative;
  overflow: hidden;
  cursor: default;
  transition: border-color 0.2s;
}

.event-row::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 3px;
  background: var(--primary);
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.event-row::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(205, 43, 204, 0.15), transparent 70%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.event-row:hover { border-color: rgba(205, 43, 204, 0.2); }
.event-row:hover::before { transform: scaleY(1); }
.event-row:hover::after { opacity: 1; }

.event-date {
  position: relative;
  z-index: 1;
  text-align: center;
}

.ev-day {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 32px;
  line-height: 1;
  color: var(--primary);
}

.ev-mon {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
  margin-top: 4px;
}

.event-info {
  position: relative;
  z-index: 1;
}

.ev-name {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 4px;
}

.ev-venue {
  font-size: 13px;
  color: var(--muted);
}

.ev-venue strong {
  color: rgba(255, 255, 255, 0.65);
  font-weight: 400;
}
</style>
