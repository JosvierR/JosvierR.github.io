const phoneMarkup = `
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
          <span class="chip">Explore Atlas · Live on iOS & Android</span>
          <h3>Smart routes, hidden spots & AI-powered trip planning.</h3>
          <p>Discover curated experiences, safe paths and local-first routes with one tap.</p>
        </div>

        <div class="phone-card secondary">
          <span class="label">Today’s route · Santo Domingo</span>
          <p class="title">Zona Colonial → Hidden viewpoints → Food crawl</p>
          <p class="meta">ETA 3h 20m · 5 curated stops · AI-ranked by vibe & safety</p>
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

function renderPhoneMockup() {
  const mount = document.getElementById("phoneMount");
  if (!mount) return;
  mount.innerHTML = phoneMarkup;
}

document.addEventListener("DOMContentLoaded", renderPhoneMockup);
