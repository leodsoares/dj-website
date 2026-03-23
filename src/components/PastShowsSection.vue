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
              <span v-if="ev.name.toLowerCase().includes('brazil') || ev.name.toLowerCase().includes('bailin')" class="tag tag-brazil">🇧🇷🍑 Brazilian Funk</span>
              <span v-if="(ev.venue.includes('Celebrities') || ev.name.toLowerCase().includes('soundroom') || ev.techhouse) && !ev.notechhouse" class="tag tag-techhouse">💿 Tech House</span>
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

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-number">{{ displayVenues }}</div>
          <div class="stat-label">Venues</div>
          <div class="stat-sub">gotta catch them all <img src="/src/assets/pokemon.png" alt="pokeball" class="pokeball-icon" /></div>
        </div>
        <div class="stat-card stat-card--featured">
          <div class="stat-number">{{ displayHours }}<span class="stat-unit">h</span></div>
          <div class="stat-label">Hours Playing</div>
          <div class="stat-edc">that's <strong>{{ edcDays }} days</strong> of EDC</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ displayShows }}</div>
          <div class="stat-label">Shows</div>
          <div class="stat-sub">...and more to come!</div>
        </div>
      </div>

      <div class="filter-bar">
        <button
          v-for="tag in tagFilters"
          :key="tag"
          class="filter-btn"
          :class="['filter-btn', tag ? `filter-btn--${tag}` : '', { active: selectedTag === tag }]"
          @click="selectedTag = tag"
        >
          {{ tag === null ? 'All' : TAG_LABELS[tag] }}
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
                  <span v-if="ev.name.toLowerCase().includes('brazil') || ev.name.toLowerCase().includes('bailin')" class="tag tag-brazil">🇧🇷🍑 Brazilian Funk</span>
                  <span v-if="(ev.venue.includes('Celebrities') || ev.name.toLowerCase().includes('soundroom') || ev.techhouse) && !ev.notechhouse" class="tag tag-techhouse">💿 Tech House</span>
                  <span v-if="ev.name.toLowerCase().includes('pop fridays') || ev.name.toLowerCase().includes('queer garden') || ev.name.toLowerCase().includes('drag bingo') || ev.snow" class="tag tag-pop">🎤 Pop</span>
                  <span v-if="ev.openformat" class="tag tag-openformat">🎵 Open Format</span>
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
import { computed, ref, onMounted } from 'vue'

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
  { date: new Date(2026, 1, 15), name: 'Macho',                                    venue: 'Skylight Warehouse',  city: 'Vancouver, BC', techhouse: true },
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
  { date: new Date(2025, 10, 22), name: 'Engagement Party',                        venue: 'The Forge',           city: 'Vancouver, BC', openformat: true },
  { date: new Date(2025, 10, 21), name: 'Pop Fridays: Leo Edition',                venue: '1181 Davie St',       city: 'Vancouver, BC' },
  { date: new Date(2025, 10,  1), name: 'Soundroom Leo Edition',                   venue: '1181 Davie St',       city: 'Vancouver, BC' },
  // October 2025
  { date: new Date(2025, 9, 25), name: 'Soundroom Halloween Edition b2b Diego Valente', venue: '1181 Davie St', city: 'Vancouver, BC', halloween: true },
  { date: new Date(2025, 9, 11), name: 'Soundroom Leo Edition',                    venue: '1181 Davie St',       city: 'Vancouver, BC' },
  { date: new Date(2025, 9,  3), name: "BassLegacy's Birthday Takeover",           venue: 'The Cambie',          city: 'Vancouver, BC', openformat: true },
  // September 2025
  { date: new Date(2025, 8, 27), name: 'Playhouse Saturdays: JWorra',              venue: 'Celebrities Nightclub', city: 'Vancouver, BC' },
  { date: new Date(2025, 8, 27), name: "Katie + Ed's Home By 9 Party",             venue: 'Harbour Cruises',     city: 'Vancouver, BC', openformat: true },
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
  { date: new Date(2025, 6, 31), name: 'Come 2 Brazil: Normie Pride',              venue: 'Celebrities Nightclub', city: 'Vancouver, BC', pride: true, notechhouse: true },
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
  { date: new Date(2025, 4,  4), name: 'BMO Marathon',                             venue: 'Vancouver Rowing Club', city: 'Vancouver, BC', openformat: true },
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

function getEventHours(ev) {
  if (ev.name.toLowerCase().includes('pop fridays')) return 1
  if (ev.name === 'Macho') return 3
  if (ev.venue.includes('1181')) return 4
  if (ev.venue.includes('Celebrities')) return 1
  return 3
}

const EDC_HOURS_PER_DAY = 12

const stats = {
  venues: new Set(PAST_EVENTS.map(ev => ev.venue)).size,
  hours:  PAST_EVENTS.reduce((sum, ev) => sum + getEventHours(ev), 0),
  shows:  PAST_EVENTS.length,
}

const displayVenues = ref(0)
const displayHours  = ref(0)
const displayShows  = ref(0)
const edcDays = computed(() => (displayHours.value / EDC_HOURS_PER_DAY).toFixed(1))

function animateCount(target, setter, duration = 900) {
  const start = performance.now()
  function step(now) {
    const p = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - p, 4)
    setter(Math.round(target * eased))
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

onMounted(() => {
  animateCount(stats.venues, v => displayVenues.value = v)
  animateCount(stats.hours,  v => displayHours.value  = v)
  animateCount(stats.shows,  v => displayShows.value  = v)
})

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

const TAG_LABELS = {
  residency:  '🏠 Residency',
  blueprint:  '🫆 Blueprint',
  techhouse:  '💿 Tech House',
  pop:        '🎤 Pop',
  brazil:     '🇧🇷🍑 Brazilian Funk',
  pride:      '🏳️‍🌈 Pride',
  halloween:  '🎃 Halloween',
  openformat: '🎵 Open Format',
}

function getEventTags(ev) {
  const t = []
  if (ev.venue.includes('1181')) t.push('residency')
  if (ev.venue.includes('Celebrities')) t.push('blueprint')
  if ((ev.venue.includes('Celebrities') || ev.name.toLowerCase().includes('soundroom') || ev.techhouse) && !ev.notechhouse) t.push('techhouse')
  if (ev.name.toLowerCase().includes('pop fridays') || ev.name.toLowerCase().includes('queer garden') || ev.name.toLowerCase().includes('drag bingo') || ev.snow) t.push('pop')
  if (ev.name.toLowerCase().includes('brazil') || ev.name.toLowerCase().includes('bailin')) t.push('brazil')
  if (ev.pride) t.push('pride')
  if (ev.halloween) t.push('halloween')
  if (ev.openformat) t.push('openformat')
  return t
}

const selectedTag = ref(null)

const tagFilters = computed(() => {
  const used = new Set(PAST_EVENTS.flatMap(getEventTags))
  return [null, ...Object.keys(TAG_LABELS).filter(k => used.has(k))]
})

const groupedEvents = computed(() => {
  const filtered = selectedTag.value
    ? PAST_EVENTS.filter(ev => getEventTags(ev).includes(selectedTag.value))
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
  transition: border-color 0.25s, background 0.25s, transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;
}

.spotlight-card:hover {
  background: rgba(255, 255, 255, 0.055);
  border-color: rgba(205, 43, 204, 0.5);
  border-top-color: var(--primary);
  transform: scale(1.03);
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

/* ── Stats ── */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 48px;
}

.stat-card {
  padding: 32px 28px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-top: 2px solid var(--primary);
  background: rgba(255, 255, 255, 0.02);
  text-align: center;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;
}

.stat-card:hover {
  transform: scale(1.03);
}

.stat-number {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: clamp(40px, 5vw, 64px);
  line-height: 1;
  color: var(--primary);
  margin-bottom: 10px;
}

.stat-unit {
  font-size: 0.55em;
  font-weight: 400;
  opacity: 0.7;
  margin-left: 2px;
}

.stat-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--muted);
}

.stat-sub {
  margin-top: 14px;
  font-size: 11px;
  color: var(--muted);
  font-family: 'IBM Plex Mono', monospace;
  letter-spacing: 0.03em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.pokeball-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
  vertical-align: middle;
}



.stat-edc {
  margin-top: 14px;
  font-size: 12px;
  color: var(--muted);
  font-family: 'IBM Plex Mono', monospace;
  letter-spacing: 0.04em;
}

.stat-edc strong {
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
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

.filter-btn.active                      { border-color: var(--primary);           color: var(--primary);                background: rgba(205,43,204,0.08); }
.filter-btn--residency.active           { border-color: rgba(167,243,208,0.6);    color: rgba(167,243,208,1);            background: rgba(167,243,208,0.07); }
.filter-btn--blueprint.active           { border-color: rgba(96,165,250,0.6);     color: rgba(96,165,250,1);             background: rgba(96,165,250,0.07); }
.filter-btn--techhouse.active           { border-color: rgba(103,232,249,0.6);    color: rgba(103,232,249,1);            background: rgba(103,232,249,0.07); }
.filter-btn--pop.active                 { border-color: rgba(249,168,212,0.6);    color: rgba(249,168,212,1);            background: rgba(249,168,212,0.07); }
.filter-btn--brazil.active              { border-color: rgba(250,204,21,0.6);     color: rgba(250,204,21,1);             background: rgba(250,204,21,0.07); }
.filter-btn--pride.active               { border-color: rgba(255,255,255,0.4);    color: rgba(255,255,255,0.9);          background: rgba(255,255,255,0.05); }
.filter-btn--halloween.active           { border-color: rgba(251,146,60,0.6);     color: rgba(251,146,60,1);             background: rgba(251,146,60,0.07); }
.filter-btn--openformat.active          { border-image: linear-gradient(90deg,#ff0000,#ff8c00,#ffd700,#00c800,#0080ff,#8b00ff,#ff0000) 1; color: rgba(255,255,255,0.9); background: rgba(255,255,255,0.04); }

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
  transition: border-color 0.2s, transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s ease, background 0.2s;
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

.event-row:hover {
  border-color: rgba(205, 43, 204, 0.25);
  background: rgba(255, 255, 255, 0.035);
  transform: translateY(-3px) scale(1.005);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45), 0 2px 8px rgba(205, 43, 204, 0.1);
  z-index: 1;
}
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

.tag-pop {
  border-color: rgba(249, 168, 212, 0.35);
  color: rgba(249, 168, 212, 0.85);
}

@keyframes rainbow-border {
  0%   { border-image-source: linear-gradient(90deg, #ff0000, #ff8c00, #ffd700, #00c800, #0080ff, #8b00ff, #ff0000); }
  100% { border-image-source: linear-gradient(90deg, #ff8c00, #ffd700, #00c800, #0080ff, #8b00ff, #ff0000, #ff8c00); }
}

.tag-openformat {
  border-image: linear-gradient(90deg, #ff0000, #ff8c00, #ffd700, #00c800, #0080ff, #8b00ff, #ff0000) 1;
  color: rgba(255, 255, 255, 0.8);
  animation: rainbow-border 2s linear infinite;
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
