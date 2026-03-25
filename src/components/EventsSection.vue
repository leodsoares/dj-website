<template>
  <section class="events" id="events">
    <div class="events-inner">
      <p class="section-label">Live</p>
      <h2 class="section-title">Upcoming Events</h2>

      <div class="event-list">
        <div v-if="upcomingEvents.length === 0" class="no-events">
          // No upcoming events — check back soon.
        </div>

        <div
          v-for="ev in upcomingEvents"
          :key="ev.date.toISOString()"
          class="event-row"
          @mouseenter="onMove"
          @mousemove="onMove"
          @mouseleave="onLeave"
        >
          <div class="event-date">
            <div class="ev-day">{{ String(ev.date.getDate()).padStart(2, '0') }}</div>
            <div class="ev-mon">
              {{ MONTHS[ev.date.getMonth()].slice(0, 3).toUpperCase() }} · {{ ev.date.getFullYear() }}
            </div>
          </div>

          <div class="event-info">
            <div class="ev-name">{{ ev.name }}</div>
            <div class="ev-venue">
              <strong>{{ ev.venue }}</strong> &middot; {{ ev.city }}
            </div>
          </div>

          <div class="event-meta">
            <span v-if="ev.status !== 'available'" class="ev-badge" :class="ev.status">{{ STATUS_LABELS[ev.status] }}</span>
            <a
              v-if="ev.status !== 'sold-out' && ev.ticketUrl"
              class="ev-tickets"
              :href="ev.ticketUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon :icon="['fas', 'ticket']" /> Get Tickets
            </a>
            <span v-else-if="ev.doorSale" class="ev-tickets door">
              <FontAwesomeIcon :icon="['fas', 'ticket']" /> Tickets at the Door
            </span>
            <span v-else class="ev-tickets sold">
              {{ ev.status === 'sold-out' ? 'Sold Out' : '' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

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

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]

const STATUS_LABELS = {
  available: 'Available',
  limited:   'Limited',
  'sold-out': 'Sold Out',
}

const EVENTS = [
  { date: new Date(2026, 3, 4),  name: 'Soundroom', venue: '1181 Davie St', city: 'Vancouver, BC', status: 'available', doorSale: true },
  { date: new Date(2026, 3, 10), name: 'Pop Fridays', venue: '1181 Davie St', city: 'Vancouver, BC', status: 'available', doorSale: true },
  { date: new Date(2026, 3, 17), name: 'Bimbo Punk Rock', venue: 'Village Studios', city: '10 PM – 4 AM', status: 'available', ticketUrl: 'https://www.ticketweb.ca/event/bimbo-punk-rock-village-studios-tickets/14795723?pl=blueprint~&utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnKoNKumhEfvs4jLgsE13ayAUPrw7Bp5EV5bWOUlghOevCLAXZaBsfsMETui4_aem_GDgi412KbbigcVb2NQohog' },
]

const today = new Date()

const upcomingEvents = computed(() =>
  EVENTS
    .filter(e => e.date >= today)
    .sort((a, b) => a.date - b.date)
)
</script>

<style scoped>
.events {
  padding: 80px 0 120px;
  position: relative;
  margin-top: -80px;
  background: rgba(7, 7, 11, 0.15);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-top: 1px solid rgba(255, 255, 255, 0.15);
}

.events::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(to bottom, var(--bg), transparent);
  pointer-events: none;
  z-index: 0;
}

.events-inner {
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

.cal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.cal-month {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  font-size: 22px;
  letter-spacing: -0.01em;
}

.cal-nav {
  display: flex;
  gap: 6px;
}

.cal-nav-btn {
  width: 38px;
  height: 38px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  font-size: 16px;
  display: grid;
  place-items: center;
  transition: border-color 0.2s, color 0.2s;
  position: relative;
  overflow: hidden;
}

.cal-nav-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(205, 43, 204, 0.15) 1px, transparent 1px);
  background-size: 4px 4px;
  opacity: 0;
  transition: opacity 0.2s;
}

.cal-nav-btn:hover { border-color: var(--primary); color: var(--primary); }
.cal-nav-btn:hover::before { opacity: 1; }

/* Event rows */
.event-list { display: flex; flex-direction: column; gap: 2px; }

.event-row {
  display: grid;
  grid-template-columns: 100px 1fr auto;
  align-items: center;
  gap: 32px;
  padding: 24px 28px;
  border: 1px solid rgba(255, 255, 255, 0.04);
  background: rgba(255, 255, 255, 0.015);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
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

.event-date { position: relative; z-index: 1; }

.ev-day {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 44px;
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

.event-info { position: relative; z-index: 1; }

.ev-name {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  font-size: 17px;
  margin-bottom: 5px;
}

.ev-venue {
  font-size: 13px;
  color: var(--muted);
  line-height: 1.5;
}

.ev-venue strong { color: rgba(255, 255, 255, 0.65); font-weight: 400; }

.event-meta {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
}

.ev-badge {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 3px 10px;
  border: 1px solid;
}

.ev-badge.available { color: var(--success); border-color: var(--success); }
.ev-badge.limited   { color: var(--warning); border-color: var(--warning); }
.ev-badge.sold-out  { color: rgba(255, 255, 255, 0.25); border-color: rgba(255, 255, 255, 0.1); }

.ev-tickets {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 17px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  text-decoration: none;
  border: 1px solid rgba(205, 43, 204, 0.35);
  background: transparent;
  transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease;
}

.event-row:hover .ev-tickets:not(.sold):not(.door) {
  background: radial-gradient(circle, rgba(0,0,0,0.12) 1px, transparent 1px) #ffffff;
  background-size: 4px 4px;
  border-color: #ffffff;
  color: #07070b;
}

.ev-tickets.sold  { color: var(--muted); cursor: default; border-color: transparent; }
.ev-tickets.door  { cursor: default; border-color: rgba(205, 43, 204, 0.2); color: var(--muted); }

.no-events {
  padding: 80px 0;
  text-align: center;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  color: var(--muted);
  letter-spacing: 0.1em;
}

@media (max-width: 768px) {
  .events { padding: 80px 24px; }
  .events-inner { padding: 0; }
  .event-row { grid-template-columns: 72px 1fr; gap: 16px; flex-wrap: wrap; }
  .event-meta { grid-column: 1 / -1; display: flex; flex-direction: row; align-items: center; justify-content: flex-start; gap: 12px; padding-top: 4px; }
  .ev-tickets { font-size: 13px; padding: 8px 14px; }
}
</style>
