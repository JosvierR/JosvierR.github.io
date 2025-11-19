// Year in footer
document.getElementById("year").textContent = new Date().getFullYear();

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
const phone = document.getElementById("phoneParallax");
window.addEventListener("scroll", () => {
  if (!phone) return;
  const rect = phone.getBoundingClientRect();
  const offset = (window.innerHeight / 2 - rect.top - rect.height / 2) * 0.04;
  phone.style.transform = `translateY(${offset}px)`;
});
