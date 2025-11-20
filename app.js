// Year in footer
document.getElementById("year").textContent = new Date().getFullYear();

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
  thumb.textContent = theme === "dark" ? "🌙" : "☀️";
}

if (savedTheme) {
  applyTheme(savedTheme);
} else {
  const prefersDark = window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "light");
}

document.getElementById("themeToggle").addEventListener("click", () => {
  const current = root.getAttribute("data-theme") || "light";
  const next = current === "light" ? "dark" : "light";
  applyTheme(next);
  localStorage.setItem("theme", next);
});

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
  phone.style.transform = `translateY(${clamped}px)`;
  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!phone || ticking) return;
  window.requestAnimationFrame(updatePhoneParallax);
  ticking = true;
});

document.addEventListener("DOMContentLoaded", updatePhoneParallax);

updatePhoneParallax();
