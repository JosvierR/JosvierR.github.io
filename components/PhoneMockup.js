function getPhoneMarkup() {
  return `
  <div class="phone-frame" id="phoneParallax">
    <div class="phone-glow"></div>
    <div class="phone-metal"></div>
    <div class="phone-body">
      <div class="phone-notch" aria-hidden="true">
        <span class="phone-notch-speaker"></span>
        <span class="phone-notch-camera"></span>
      </div>

      <div class="phone-background">
        <div class="phone-gradient"></div>
        <div class="phone-glass"></div>
        <div class="phone-orb"></div>
        <div class="phone-shimmer"></div>
      </div>

      <div class="phone-content">
        <div class="phone-card">
          <span class="chip" data-i18n="phone.chip">Explore Atlas · Live on iOS & Android</span>
          <h3 data-i18n="phone.title">Smart routes, hidden spots & AI-powered trip planning.</h3>
          <p data-i18n="phone.subtitle">Discover curated experiences, safe paths and local-first routes with one tap.</p>
        </div>

        <div class="phone-card secondary">
          <span class="label" data-i18n="phone.label">Today's route · Santo Domingo</span>
          <p class="title" data-i18n="phone.route">Zona Colonial → Hidden viewpoints → Food crawl</p>
          <p class="meta" data-i18n="phone.meta">ETA 3h 20m · 5 curated stops · AI-ranked by vibe & safety</p>
        </div>

        <div class="phone-placeholder" aria-hidden="true">
          <div class="phone-placeholder-orb"></div>
          <div class="phone-placeholder-shimmer"></div>
        </div>
      </div>

      <div class="phone-indicator"></div>
    </div>
  </div>
`;
}

function renderPhoneMockup() {
  const mount = document.getElementById("phoneMount");
  if (!mount) return;
  mount.innerHTML = getPhoneMarkup();
}

// Re-render on language change
window.addEventListener('languageChanged', () => {
  renderPhoneMockup();
  // Manually update translations for the phone mockup elements
  if (typeof i18n !== 'undefined') {
    const phoneElements = document.querySelectorAll('#phoneMount [data-i18n]');
    phoneElements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = i18n.t(key);
      if (translation) {
        el.innerHTML = translation;
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", renderPhoneMockup);
