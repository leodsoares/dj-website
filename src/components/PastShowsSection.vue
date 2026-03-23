<template>
  <section class="past-shows" id="past-shows">
    <div class="past-shows-inner">
      <p class="section-label">Spotlight</p>
      <h2 class="section-title">Past Shows</h2>

      <p class="spotlight-label">Spotlight</p>
      <div class="spotlight-grid">
        <div
          v-for="ev in SPOTLIGHT"
          :key="ev.name"
          class="spotlight-card"
        >
          <div v-if="ev.snow" class="snow-overlay" aria-hidden="true">
            <span v-for="i in 18" :key="i" class="snowflake" :style="snowStyle(i)">❄</span>
          </div>
          <div class="sp-top">
            <div class="tag-group">
              <span v-if="ev.pride" class="tag tag-pride">🏳️‍🌈 Pride</span>
              <span v-if="ev.venue.includes('Celebrities')" class="tag tag-blueprint">🫆 Blueprint</span>
              <span v-if="ev.halloween" class="tag tag-halloween">🎃 Halloween</span>
              <span v-if="ev.venue.includes('1181')" class="tag tag-residency">🏠 Residency</span>
              <span v-if="ev.name.toLowerCase().includes('brazil') || ev.name.toLowerCase().includes('bailin')" class="tag tag-brazil">🇧🇷 Brazil</span>
              <span v-if="ev.venue.includes('Celebrities') || ev.name.toLowerCase().includes('soundroom')" class="tag tag-techhouse">💿 Tech House</span>
              <span v-if="ev.name.toLowerCase().includes('pop fridays') || ev.name.toLowerCase().includes('queer garden') || ev.name.toLowerCase().includes('drag bingo') || ev.snow" class="tag tag-pop">🎤 Pop</span>
            </div>
          </div>
          <div class="sp-body">
            <div class="sp-date">
              <span class="sp-day" :class="{ rainbow: ev.pride }">{{ String(ev.date.getDate()).padStart(2, '0') }}</span>
              <span class="sp-mon">{{ MONTHS[ev.date.getMonth()].slice(0, 3).toUpperCase() }} '{{ String(ev.date.getFullYear()).slice(2) }}</span>
            </div>
            <div class="sp-name">{{ ev.name }}</div>
            <div class="sp-venue">{{ ev.venue }} &middot; {{ ev.city }}</div>
          </div>
        </div>
      </div>

      <div class="filter-bar">
        <button
          v-for="city in cityFilters"
          :key="city"
          class="filter-btn"
          :class="{ active: selectedCity === city }"
          @click="selectedCity = city"
        >
          {{ city === null ? 'All' : city }}
        </button>
      </div>

      <div v-for="group in groupedEvents" :key="group.year" class="year-group">
        <div class="year-header">
          <span class="year-label">{{ group.year }}</span>
          <div class="year-line"></div>
        </div>

        <div class="event-list">
          <div
            v-for="ev in group.events"
            :key="ev.date.toISOString() + ev.name"
            class="event-row"
            @mouseenter="onMove"
            @mousemove="onMove"
            @mouseleave="onLeave"
          >
            <div v-if="ev.snow" class="snow-overlay" aria-hidden="true">
              <span v-for="i in 18" :key="i" class="snowflake" :style="snowStyle(i)">❄</span>
            </div>

            <div class="event-date">
              <div class="ev-day" :class="{ rainbow: ev.pride }">{{ String(ev.date.getDate()).padStart(2, '0') }}</div>
              <div class="ev-mon">{{ MONTHS[ev.date.getMonth()].slice(0, 3).toUpperCase() }}</div>
            </div>

            <div class="event-info">
              <div class="ev-name-row">
                <div class="ev-name">{{ ev.name }}</div>
                <div class="tag-group">
                  <span v-if="ev.pride" class="tag tag-pride">🏳️‍🌈 Pride</span>
                  <span v-if="ev.venue.includes('Celebrities')" class="tag tag-blueprint">🫆 Blueprint</span>
                  <span v-if="ev.halloween" class="tag tag-halloween">🎃 Halloween</span>
                  <span v-if="ev.venue.includes('1181')" class="tag tag-residency">🏠 Residency</span>
                  <span v-if="ev.name.toLowerCase().includes('brazil') || ev.name.toLowerCase().includes('bailin')" class="tag tag-brazil">🇧🇷 Brazil</span>
                  <span v-if="ev.venue.includes('Celebrities') || ev.name.toLowerCase().includes('soundroom')" class="tag tag-techhouse">💿 Tech House</span>
                  <span v-if="ev.name.toLowerCase().includes('pop fridays') || ev.name.toLowerCase().includes('queer garden') || ev.name.toLowerCase().includes('drag bingo') || ev.snow" class="tag tag-pop">🎤 Pop</span>
                </div>
              </div>
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
import { computed, ref } from 'vue'

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]

const SPOTLIGHT = [
  { date: new Date(2026, 2,  7), name: 'Playhouse Saturdays: Josh Harrison', venue: 'Celebrities Nightclub', city: 'Vancouver, BC' },
  { date: new Date(2025, 7,  3), name: 'Pride History Sunday',               venue: 'Celebrities Nightclub (Outside)', city: 'Vancouver, BC', pride: true },
  { date: new Date(2026, 0, 29), name: 'Whistler Pride Aprés-Ski',           venue: "Merlin's Bar & Grill",  city: 'Whistler, BC', pride: true, snow: true },
]

const PAST_EVENTS = [
  // March 2026
  { date: new Date(2026, 2, 21), name: 'Spring Kickoff b2b Skylar Love',          venue: '1181 Davie St',       city: 'Vancouver, BC' },
  { date: new Date(2026, 2, 14), name: 'Soundroom',                                venue: '1181 Davie St',       city: 'Vancouver, BC' },
  { date: new Date(2026, 2,  7), name: 'Playhouse Saturdays: Josh Harrison',       venue: 'Celebrities Nightclub', city: 'Vancouver, BC' },
  // February 2026
  { date: new Date(2026, 1, 21), name: '1181 Carnaval 🪩🎶',                       venue: '1181 Davie St',       city: 'Vancouver, BC' },
  { date: new Date(2026, 1, 15), name: 'Macho',                                    venue: 'Skylight Warehouse',  city: 'Vancouver, BC' },
  // January 2026
  { date: new Date(2026, 0, 29), name: 'Whistler Pride Aprés-Ski',                 venue: "Merlin's Bar & Grill", city: 'Whistler, BC', pride: true, snow: true },
  { date: new Date(2026, 0, 29), name: 'Whistler Pride Charity Race',              venue: 'Blackcomb Mountain',  city: 'Whistler, BC', pride: true, snow: true },
  { date: new Date(2026, 0, 24), name: 'Soundroom Leo Edition',                    venue: '1181 Davie St',       city: 'Vancouver, BC' },
  { date: new Date(2026, 0, 17), name: 'Come2Brazil',                              venue: 'Birdhouse',           city: 'Vancouver, BC' },
  // December 2025
  { date: new Date(2025, 11, 7), name: 'Soundroom Leo Edition',                    venue: '1181 Davie St',       city: 'Vancouver, BC' },
  { date: new Date(2025, 11, 6), name: 'Soundroom Leo Edition',                    venue: '1181 Davie St',       city: 'Vancouver, BC' },
  // November 2025
  { date: new Date(2025, 10, 29), name: 'PlayHouse Saturdays: Local Love b2b Gerard', venue: 'Celebrities Nightclub', city: 'Vancouver, BC' },
  { date: new Date(2025, 10, 26), name: 'Drag Bingo',                              venue: 'The Fountainhead',    city: 'Vancouver, BC' },
  { date: new Date(2025, 10, 22), name: 'Engagement Party',                        venue: 'The Forge',           city: 'Vancouver, BC' },
  { date: new Date(2025, 10, 21), name: 'Pop Fridays: Leo Edition',                venue: '1181 Davie St',       city: 'Vancouver, BC' },
  { date: new Date(2025, 10,  1), name: 'Soundroom Leo Edition',                   venue: '1181 Davie St',       city: 'Vancouver, BC' },
  // October 2025
  { date: new Date(2025, 9, 25), name: 'Soundroom Halloween Edition b2b Diego Valente', venue: '1181 Davie St', city: 'Vancouver, BC', halloween: true },
  { date: new Date(2025, 9, 11), name: 'Soundroom Leo Edition',                    venue: '1181 Davie St',       city: 'Vancouver, BC' },
  { date: new Date(2025, 9,  3), name: "BassLegacy's Birthday Takeover",           venue: 'The Cambie',          city: 'Vancouver, BC' },
  // September 2025
  { date: new Date(2025, 8, 27), name: 'Playhouse Saturdays: JWorra',              venue: 'Celebrities Nightclub', city: 'Vancouver, BC' },
  { date: new Date(2025, 8, 27), name: "Katie + Ed's Home By 9 Party",             venue: 'Harbour Cruises',     city: 'Vancouver, BC' },
  { date: new Date(2025, 8, 20), name: 'Soundroom',                                venue: '1181 Davie St',       city: 'Vancouver, BC' },
  // August 2025
  { date: new Date(2025, 7, 30), name: 'PlayHouse Saturdays: Local Love',          venue: 'Celebrities Nightclub', city: 'Vancouver, BC' },
  { date: new Date(2025, 7,  9), name: 'Soundroom Leo Edition',                    venue: '1181 Davie St',       city: 'Vancouver, BC' },
  { date: new Date(2025, 7,  3), name: 'Pride History Sunday',                     venue: 'Celebrities Nightclub (Outside)', city: 'Vancouver, BC', pride: true },
  { date: new Date(2025, 7,  3), name: '1181 Pride Closing Party',                 venue: '1181 Davie St',       city: 'Vancouver, BC', pride: true },
  { date: new Date(2025, 7,  3), name: 'Davie Village Pride Festival Main Stage',  venue: 'Davie St',            city: 'Vancouver, BC', pride: true },
  { date: new Date(2025, 7,  2), name: 'Queer Garden: Pride Party',                venue: 'Parallel 49 Brewing', city: 'Vancouver, BC', pride: true },
  { date: new Date(2025, 7,  2), name: 'Homotherapy Day Party',                    venue: 'XY Club',             city: 'Vancouver, BC', pride: true },
  // July 2025
  { date: new Date(2025, 6, 31), name: 'Come 2 Brazil: Normie Pride',              venue: 'Celebrities Nightclub', city: 'Vancouver, BC', pride: true },
  { date: new Date(2025, 6, 31), name: 'Destination Vancouver Boat Cruise',        venue: '501 Denman St',       city: 'Vancouver, BC', pride: true },
  { date: new Date(2025, 6, 26), name: 'Bailin: 2 Year Anniversary',               venue: '1216 Bute St',        city: 'Vancouver, BC' },
  { date: new Date(2025, 6,  5), name: 'Unofficial Fvded After-Party',             venue: '1181 Davie St',       city: 'Vancouver, BC' },
  // June 2025
  { date: new Date(2025, 5, 30), name: 'Long Weekend Party',                       venue: '1181 Davie St',       city: 'Vancouver, BC' },
  { date: new Date(2025, 5, 27), name: '🎤 Pop Fridays 🎧',                        venue: '1181 Davie St',       city: 'Vancouver, BC' },
  { date: new Date(2025, 5, 20), name: '🎤 Pop Fridays 🎧',                        venue: '1181 Davie St',       city: 'Vancouver, BC' },
  { date: new Date(2025, 5, 14), name: 'Garden of Eden Party',                     venue: '1181 Davie St',       city: 'Vancouver, BC' },
  { date: new Date(2025, 5,  7), name: 'Soundroom',                                venue: '1181 Davie St',       city: 'Vancouver, BC' },
  // May 2025
  { date: new Date(2025, 4, 10), name: 'Soundroom Leo Edition',                    venue: '1181 Davie St',       city: 'Vancouver, BC' },
  { date: new Date(2025, 4,  4), name: 'BMO Marathon',                             venue: 'Vancouver Rowing Club', city: 'Vancouver, BC' },
  // April 2025
  { date: new Date(2025, 3,  5), name: 'Soundroom',                                venue: '1181 Davie St',       city: 'Vancouver, BC' },
  // March 2025
  { date: new Date(2025, 2, 29), name: 'Rewind',                                   venue: '1181 Davie St',       city: 'Vancouver, BC' },
  { date: new Date(2025, 2, 15), name: 'Bailin',                                   venue: 'The Pearl',           city: 'Vancouver, BC' },
  { date: new Date(2025, 2,  1), name: '1181 Carnaval 🪩🎶',                       venue: '1181 Davie St',       city: 'Vancouver, BC' },
  // February 2025
  { date: new Date(2025, 1, 28), name: 'DJ Anitta + Pabllo Takeover',              venue: '1181 Davie St',       city: 'Vancouver, BC' },
  { date: new Date(2025, 1, 22), name: 'Soundroom',                                venue: '1181 Davie St',       city: 'Vancouver, BC' },
  { date: new Date(2025, 1, 15), name: 'Homotherapy',                              venue: 'XY Club',             city: 'Vancouver, BC' },
  { date: new Date(2025, 1, 15), name: 'Rewind',                                   venue: '1181 Davie St',       city: 'Vancouver, BC' },
  // January 2025
  { date: new Date(2025, 0, 17), name: 'Pop Fridays',                              venue: '1181 Davie St',       city: 'Vancouver, BC' },
  { date: new Date(2025, 0, 10), name: 'Pop Fridays',                              venue: '1181 Davie St',       city: 'Vancouver, BC' },
  // November 2024
  { date: new Date(2024, 10, 22), name: 'Pop Fridays',                             venue: '1181 Davie St',       city: 'Vancouver, BC' },
  { date: new Date(2024, 10,  1), name: 'Pop Fridays',                             venue: '1181 Davie St',       city: 'Vancouver, BC' },
  // October 2024
  { date: new Date(2024, 9, 25), name: 'Pop Fridays',                              venue: '1181 Davie St',       city: 'Vancouver, BC' },
  // September 2024
  { date: new Date(2024, 8,  1), name: 'Labour Day Party w/ DJs Diego and Leo',   venue: '1181 Davie St',       city: 'Vancouver, BC' },
]

function snowStyle(i) {
  return {
    left:              `${(i * 31 + 7) % 100}%`,
    animationDelay:    `${((i * 0.37) % 3).toFixed(2)}s`,
    animationDuration: `${(2.5 + (i * 0.29) % 2).toFixed(2)}s`,
    fontSize:          `${8 + (i * 3) % 7}px`,
    opacity:           `${(0.3 + (i * 0.047) % 0.5).toFixed(2)}`,
  }
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

const selectedCity = ref(null)

const cityFilters = computed(() => {
  const cities = [...new Set(PAST_EVENTS.map(ev => ev.city))].sort()
  return [null, ...cities]
})

const groupedEvents = computed(() => {
  const filtered = selectedCity.value
    ? PAST_EVENTS.filter(ev => ev.city === selectedCity.value)
    : PAST_EVENTS
  const sorted = [...filtered].sort((a, b) => b.date - a.date)
  const map = sorted.reduce((acc, ev) => {
    const year = ev.date.getFullYear()
    if (!acc[year]) acc[year] = []
    acc[year].push(ev)
    return acc
  }, {})
  return Object.keys(map)
    .map(Number)
    .sort((a, b) => b - a)
    .map(year => ({ year, events: map[year] }))
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

/* ── Spotlight ── */
.spotlight-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: #ffffff;
  margin-bottom: 16px;
}

.spotlight-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 64px;
}

.spotlight-card {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 28px;
  min-height: 200px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-top: 2px solid var(--primary);
  transition: border-color 0.25s, background 0.25s;
  cursor: default;
}

.spotlight-card:hover {
  background: rgba(255, 255, 255, 0.055);
  border-color: rgba(205, 43, 204, 0.5);
  border-top-color: var(--primary);
}

.sp-top {
  display: flex;
  justify-content: flex-end;
  min-height: 22px;
  position: relative;
  z-index: 1;
}

.sp-body {
  position: relative;
  z-index: 1;
}

.sp-date {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 14px;
}

.sp-day {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 48px;
  line-height: 1;
  color: var(--primary);
}

.sp-day.rainbow {
  background: linear-gradient(90deg, #ff0000, #ff8c00, #ffd700, #00c800, #0080ff, #8b00ff, #ff0000);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: rainbow-shift 3s linear infinite;
}

.sp-mon {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
}

.sp-name {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  font-size: 17px;
  line-height: 1.25;
  margin-bottom: 8px;
}

.sp-venue {
  font-size: 12px;
  color: var(--muted);
}

/* ── Filters ── */
.filter-bar {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 48px;
}

.filter-btn {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: 8px 18px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
}

.filter-btn:hover {
  border-color: rgba(205, 43, 204, 0.4);
  color: rgba(255, 255, 255, 0.8);
}

.filter-btn.active {
  border-color: var(--primary);
  color: var(--primary);
  background: rgba(205, 43, 204, 0.08);
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

@keyframes rainbow-shift {
  0%   { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

.ev-day.rainbow {
  background: linear-gradient(90deg, #ff0000, #ff8c00, #ffd700, #00c800, #0080ff, #8b00ff, #ff0000);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: rainbow-shift 3s linear infinite;
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

.ev-name-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 4px;
}

.ev-name {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  font-size: 16px;
}

@keyframes snowfall {
  0%   { transform: translateY(-10px) rotate(0deg);   opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 0.7; }
  100% { transform: translateY(90px) rotate(180deg); opacity: 0; }
}

.snow-overlay {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.snowflake {
  position: absolute;
  top: 0;
  color: rgba(255, 255, 255, 0.9);
  animation: snowfall linear infinite;
  user-select: none;
}

.tag-group {
  display: flex;
  gap: 6px;
}

.tag {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 3px 8px;
  white-space: nowrap;
  flex-shrink: 0;
  border: 1px solid;
}

.tag-pride {
  border-color: rgba(255, 255, 255, 0.25);
  color: rgba(255, 255, 255, 0.7);
}

.tag-blueprint {
  border-color: rgba(96, 165, 250, 0.4);
  color: rgba(96, 165, 250, 0.9);
}

.tag-halloween {
  border-color: rgba(251, 146, 60, 0.4);
  color: rgba(251, 146, 60, 0.9);
}

.tag-residency {
  border-color: rgba(167, 243, 208, 0.35);
  color: rgba(167, 243, 208, 0.85);
}

.tag-brazil {
  border-color: rgba(250, 204, 21, 0.35);
  color: rgba(250, 204, 21, 0.85);
}

.tag-techhouse {
  border-color: rgba(103, 232, 249, 0.35);
  color: rgba(103, 232, 249, 0.85);
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
