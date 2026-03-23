<template>
  <footer class="footer">
    <div class="footer-name">DJ Leo Soares</div>
    <div class="footer-copy">&copy; 2026 &middot; All rights reserved</div>
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

@media (max-width: 768px) {
  .footer { padding: 28px 24px; flex-direction: column; gap: 12px; text-align: center; }
}
</style>
