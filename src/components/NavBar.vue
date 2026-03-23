<template>
  <nav class="nav">
    <ul class="nav-links">
      <li><RouterLink to="/">About</RouterLink></li>
      <li><RouterLink to="/#events">Events</RouterLink></li>
    </ul>
    <RouterLink to="/" class="nav-logo">
      <img src="/src/assets/logo2.png" alt="DJ Leo Soares" class="nav-logo-img" />
    </RouterLink>
    <ul class="nav-links">
      <li><RouterLink to="/past-shows">Past Shows</RouterLink></li>
      <li><RouterLink to="/#contact">Contact</RouterLink></li>
    </ul>
  </nav>
</template>


<style scoped>
.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 48px;
  background: linear-gradient(to bottom, rgba(7, 7, 11, 0.98) 60%, transparent);
  backdrop-filter: blur(2px);
}

.nav-logo {
  text-decoration: none;
  display: flex;
  align-items: center;
}

.nav-logo-img {
  height: 105px;
  width: auto;
  filter: invert(1);
}

.nav-links {
  display: flex;
  gap: 40px;
  list-style: none;
  flex: 1;
  justify-content: center;
}

.nav-links:first-child {
  justify-content: flex-end;
  padding-right: 24px;
}

.nav-links:last-child {
  justify-content: flex-start;
  padding-left: 24px;
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

@media (max-width: 768px) {
  .nav { padding: 18px 24px; }
  .nav-links { display: none; }
}
</style>
