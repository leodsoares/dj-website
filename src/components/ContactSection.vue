<template>
  <section class="contact" id="contact">
    <div class="contact-inner">
      <p class="section-label">Get in touch</p>
      <h2 class="section-title">Contact</h2>

      <div class="contact-layout">
        <div class="contact-intro">
          <p class="intro-text">Bookings, collabs, or just want to say hi — drop a message and I'll get back to you.</p>
          <a href="mailto:bookings@leosoaresmusic.com" class="contact-email">bookings@leosoaresmusic.com</a>
        </div>

        <form class="contact-form" @submit.prevent="handleSubmit">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="firstName">First Name</label>
              <input id="firstName" v-model="form.firstName" class="form-input" type="text" placeholder="Dominic" required />
            </div>
            <div class="form-group">
              <label class="form-label" for="lastName">Last Name</label>
              <input id="lastName" v-model="form.lastName" class="form-input" type="text" placeholder="Schuester" required />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="subject">Subject</label>
            <input id="subject" v-model="form.subject" class="form-input" type="text" placeholder="You are awesome" required />
          </div>

          <div class="form-group">
            <label class="form-label" for="message">Message</label>
            <textarea id="message" v-model="form.message" class="form-input form-textarea" placeholder="Tell me more..." rows="6" required></textarea>
          </div>

          <button type="submit" class="form-submit">Send Message &rarr;</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  firstName: '',
  lastName:  '',
  subject:   '',
  message:   '',
})

function handleSubmit() {
  const name    = `${form.value.firstName} ${form.value.lastName}`.trim()
  const body    = `Name: ${name}\n\n${form.value.message}`
  const mailto  = `mailto:bookings@leosoaresmusic.com`
             + `?subject=${encodeURIComponent(form.value.subject)}`
             + `&body=${encodeURIComponent(body)}`
  window.location.href = mailto
}
</script>

<style scoped>
.contact {
  min-height: 100vh;
  padding: 140px 48px 120px;
  position: relative;
}

.contact-inner {
  max-width: 860px;
  position: relative;
  z-index: 1;
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
  font-weight: 700;
  font-size: clamp(48px, 8vw, 100px);
  letter-spacing: -0.025em;
  line-height: 0.9;
  margin-bottom: 64px;
  text-transform: uppercase;
}

.contact-layout {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.contact-email {
  display: inline-block;
  margin-top: 16px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  letter-spacing: 0.06em;
  color: var(--primary);
  text-decoration: none;
  transition: opacity 0.2s;
}

.contact-email:hover { opacity: 0.7; }

.intro-text {
  font-size: 15px;
  color: var(--muted);
  line-height: 1.7;
  max-width: 480px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.04em;
}

/* Form */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--muted);
}

.form-input {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom-color: rgba(205, 43, 204, 0.3);
  color: var(--surface);
  font-family: 'Space Grotesk', sans-serif;
  font-size: 15px;
  padding: 14px 16px;
  outline: none;
  transition: border-color 0.2s, background 0.2s;
  width: 100%;
  box-sizing: border-box;
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.2);
}

.form-input:focus {
  border-color: rgba(205, 43, 204, 0.6);
  background: rgba(205, 43, 204, 0.04);
}

.form-textarea {
  resize: vertical;
  min-height: 140px;
  line-height: 1.6;
}

.form-submit {
  align-self: flex-start;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  padding: 16px 36px;
  background: var(--primary);
  color: #ffffff;
  border: none;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  position: relative;
  overflow: hidden;
}

.form-submit::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px);
  background-size: 4px 4px;
  opacity: 0;
  transition: opacity 0.2s;
}

.form-submit:hover { background: #a81fa7; transform: translateY(-2px); }
.form-submit:hover::after { opacity: 1; }

@media (max-width: 768px) {
  .contact { padding: 110px 24px 80px; }
  .form-row { grid-template-columns: 1fr; }
}
</style>
