import { animateChildrenStagger, animateElement, initAnimatedSections, useReducedMotion } from './motionPresets.js';

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

// Motion helpers
let reducedMotion = useReducedMotion();
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
reducedMotionQuery.addEventListener('change', () => {
  reducedMotion = useReducedMotion();
});

function initHeroAnimations() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const title = hero.querySelector('h1');
  const subtitle = hero.querySelector('.hero-subtitle');
  const tagline = hero.querySelector('.hero-tagline');
  const chips = hero.querySelectorAll('.chip');
  const actions = hero.querySelector('.hero-actions');

  animateElement(title, 'fadeInUp');
  animateElement(subtitle, 'fadeInUp', 80);
  animateElement(tagline, 'fadeInUp', 140);
  animateChildrenStagger(actions, '.btn', 'fadeInUp', 200, 80);
  chips.forEach((chip, index) => animateElement(chip, 'fadeInUp', 120 + index * 70));
}

// Phone mockup motion
let phone;
let ticking = false;
let tiltTimeout;

function updatePhoneParallax() {
  if (reducedMotion) return;
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

function initPhoneTilt() {
  const mount = document.querySelector('.hero-right');
  phone = document.getElementById('phoneParallax');
  if (!mount || !phone) return;
  if (reducedMotion) {
    phone.style.transform = 'translate3d(0, var(--phone-offset, 0px), 0)';
    return;
  }

  const resetTilt = () => {
    phone.style.setProperty('--tilt-x', '0deg');
    phone.style.setProperty('--tilt-y', '0deg');
  };

  mount.addEventListener('mousemove', (e) => {
    const bounds = mount.getBoundingClientRect();
    const x = ((e.clientX - bounds.left) / bounds.width) - 0.5;
    const y = ((e.clientY - bounds.top) / bounds.height) - 0.5;
    const tiltX = (-y * 8).toFixed(2);
    const tiltY = (x * 10).toFixed(2);
    phone.style.setProperty('--tilt-x', `${tiltX}deg`);
    phone.style.setProperty('--tilt-y', `${tiltY}deg`);
    clearTimeout(tiltTimeout);
    tiltTimeout = setTimeout(resetTilt, 1200);
  });

  mount.addEventListener('mouseleave', resetTilt);
}

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
  animateElement(commandPalette.querySelector('.command-dialog'), 'scaleIn');
  animateChildrenStagger(commandPalette, '.command-option', 'fadeInUp', 120, 60);
  if (commandInput) commandInput.focus();
}

function closePaletteUI() {
  if (!commandPalette) return;
  animateElement(commandPalette.querySelector('.command-dialog'), 'fadeInDown');
  setTimeout(() => {
    commandPalette.classList.remove("open");
    commandPalette.setAttribute("aria-hidden", "true");
  }, 200);
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

// Cards hover microinteractions
function enhanceCards() {
  const cards = document.querySelectorAll('.glass-card, .project-card, .contact-card');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--pointer-x', `${x}px`);
      card.style.setProperty('--pointer-y', `${y}px`);
    });
  });
}

function initPageTransition() {
  const layer = document.querySelector('.page-transition');
  if (!layer) return;
  setTimeout(() => layer.classList.add('animate'), 60);
}

function initBadgesPulse() {
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card) => {
    const badge = card.querySelector('.project-tag');
    if (!badge) return;
    card.addEventListener('mouseenter', () => {
      animateElement(badge, 'scaleIn');
    });
  });
}

function initContactReveal() {
  const form = document.querySelector('.contact-card form');
  if (!form) return;
  const inputs = form.querySelectorAll('input, textarea, button');
  animateChildrenStagger(form, 'input, textarea, button', 'fadeInUp', 120, 80);
}

function initHeroFloat() {
  phone = document.getElementById("phoneParallax");
  if (!phone || reducedMotion) return;
  animateElement(phone, 'floatSlow');
}

function bootstrapMotion() {
  initAnimatedSections();
  initHeroAnimations();
  initHeroFloat();
  initPhoneTilt();
  initBadgesPulse();
  initContactReveal();
  initPageTransition();
}

window.addEventListener("scroll", () => {
  if (reducedMotion) return;
  if (!phone || ticking) return;
  window.requestAnimationFrame(updatePhoneParallax);
  ticking = true;
});

document.addEventListener("DOMContentLoaded", () => {
  updatePhoneParallax();
  bootstrapMotion();
  enhanceCards();
});

updatePhoneParallax();
