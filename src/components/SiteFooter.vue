<template>
  <footer class="footer">
    <div class="footer-name">DJ Leo Soares</div>
    <div class="footer-copy">&copy; 2026 &middot; All rights reserved</div>
    <div class="footer-attr">
      <a href="https://www.flaticon.com/free-icons/pokemon" title="pokemon icons" target="_blank" rel="noopener">Pokemon icons created by Freepik - Flaticon</a>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 36px 48px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer-name {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.footer-copy {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  color: var(--muted);
  letter-spacing: 0.12em;
}

.footer-attr {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  color: rgba(255, 255, 255, 0.2);
}

.footer-attr a {
  color: inherit;
  text-decoration: none;
}

.footer-attr a:hover {
  color: rgba(255, 255, 255, 0.45);
}

@media (max-width: 768px) {
  .footer { padding: 28px 24px; flex-direction: column; gap: 12px; text-align: center; }
}
</style>
