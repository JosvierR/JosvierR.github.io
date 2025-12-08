// Year in footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Language selector
const langSelector = document.getElementById("langSelector");
if (langSelector) {
  langSelector.addEventListener("change", (e) => {
    if (typeof i18n !== 'undefined') {
      i18n.setLanguage(e.target.value);
    }
  });
}

// Theme (Apple-style hybrid: follow system, allow override)
const root = document.documentElement;
const thumb = document.getElementById("themeThumb");
const savedTheme = localStorage.getItem("theme");

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  if (thumb) thumb.textContent = theme === "dark" ? "🌙" : "☀️";
}

if (savedTheme) {
  applyTheme(savedTheme);
} else {
  const prefersDark = window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "dark");
}

const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "light";
    const next = current === "light" ? "dark" : "light";
    applyTheme(next);
    localStorage.setItem("theme", next);
  });
}

// Scroll reveal
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
reveals.forEach(el => observer.observe(el));

// Parallax on iPhone mockup
let phone;
let ticking = false;

function updatePhoneParallax() {
  if (!phone) {
    phone = document.getElementById("phoneParallax");
  }
  if (!phone) {
    ticking = false;
    return;
  }
  const rect = phone.getBoundingClientRect();
  const rawOffset = (window.innerHeight / 2 - rect.top - rect.height / 2) * 0.02;
  const clamped = Math.max(-5, Math.min(5, rawOffset));
  phone.style.setProperty("--phone-offset", `${clamped}px`);
  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!phone || ticking) return;
  window.requestAnimationFrame(updatePhoneParallax);
  ticking = true;
});

document.addEventListener("DOMContentLoaded", updatePhoneParallax);

updatePhoneParallax();

// Header shrink on scroll
const siteHeader = document.querySelector(".site-header");
window.addEventListener("scroll", () => {
  if (!siteHeader) return;
  siteHeader.classList.toggle("scrolled", window.scrollY > 24);
});

// Command palette
const commandFab = document.getElementById("commandFab");
const commandPalette = document.getElementById("commandPalette");
const commandOverlay = document.getElementById("commandOverlay");
const closePalette = document.getElementById("closePalette");
const commandInput = document.getElementById("commandInput");
const commandOptions = document.querySelectorAll(".command-option");

function openPalette() {
  if (!commandPalette) return;
  commandPalette.classList.add("open");
  commandPalette.setAttribute("aria-hidden", "false");
  if (commandInput) commandInput.focus();
}

function closePaletteUI() {
  if (!commandPalette) return;
  commandPalette.classList.remove("open");
  commandPalette.setAttribute("aria-hidden", "true");
}

commandFab?.addEventListener("click", openPalette);
commandOverlay?.addEventListener("click", closePaletteUI);
closePalette?.addEventListener("click", closePaletteUI);

commandOptions.forEach((option) => {
  option.addEventListener("click", (e) => {
    const target = e.currentTarget.getAttribute("data-target");
    if (target) {
      window.location.href = target;
      closePaletteUI();
    }
  });
});

window.addEventListener("keydown", (e) => {
  const isCommand = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
  if (isCommand) {
    e.preventDefault();
    openPalette();
  }
  if (e.key === "Escape") {
    closePaletteUI();
  }
});

if (commandInput) {
  commandInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    commandOptions.forEach((btn) => {
      const text = btn.textContent.toLowerCase();
      btn.style.display = text.includes(query) ? "block" : "none";
    });
  });
}
