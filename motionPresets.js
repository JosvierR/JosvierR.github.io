const prefersReducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

export function useReducedMotion() {
  return prefersReducedMotionQuery.matches;
}

export const motionPresets = {
  fadeInUp: {
    keyframes: [
      { opacity: 0, transform: 'translate3d(0, 18px, 0) scale(0.96)' },
      { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' }
    ],
    options: { duration: 600, easing: 'ease-out', fill: 'forwards' }
  },
  fadeInDown: {
    keyframes: [
      { opacity: 0, transform: 'translate3d(0, -12px, 0)' },
      { opacity: 1, transform: 'translate3d(0, 0, 0)' }
    ],
    options: { duration: 500, easing: 'ease-out', fill: 'forwards' }
  },
  fadeIn: {
    keyframes: [
      { opacity: 0 },
      { opacity: 1 }
    ],
    options: { duration: 420, easing: 'ease-out', fill: 'forwards' }
  },
  scaleIn: {
    keyframes: [
      { opacity: 0, transform: 'scale(0.94)' },
      { opacity: 1, transform: 'scale(1)' }
    ],
    options: { duration: 500, easing: 'ease-out', fill: 'forwards' }
  },
  slideInFromLeft: {
    keyframes: [
      { opacity: 0, transform: 'translate3d(-18px, 0, 0)' },
      { opacity: 1, transform: 'translate3d(0, 0, 0)' }
    ],
    options: { duration: 520, easing: 'ease-out', fill: 'forwards' }
  },
  slideInFromRight: {
    keyframes: [
      { opacity: 0, transform: 'translate3d(18px, 0, 0)' },
      { opacity: 1, transform: 'translate3d(0, 0, 0)' }
    ],
    options: { duration: 520, easing: 'ease-out', fill: 'forwards' }
  },
  staggerContainer: {
    options: { stagger: 80 }
  },
  tiltHover: {
    keyframes: [
      { transform: 'rotateX(0deg) rotateY(0deg)' }
    ],
    options: { duration: 400, easing: 'ease-out', fill: 'forwards' }
  },
  floatSlow: {
    keyframes: [
      { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
      { transform: 'translate3d(0, -8px, 0) rotate(-1deg)' },
      { transform: 'translate3d(0, 6px, 0) rotate(1deg)' }
    ],
    options: { duration: 8200, easing: 'ease-in-out', iterations: Infinity, direction: 'alternate' }
  }
};

export function animateElement(element, presetName, delay = 0) {
  if (!element || useReducedMotion()) {
    if (element) {
      element.style.opacity = '1';
      element.style.transform = 'translate3d(0,0,0)';
    }
    return;
  }
  const preset = motionPresets[presetName];
  if (!preset) return;
  const animation = element.animate(preset.keyframes, {
    ...preset.options,
    delay
  });
  return animation;
}

export function animateChildrenStagger(container, childSelector, presetName, baseDelay = 0, step = 80) {
  if (!container) return;
  const children = Array.from(container.querySelectorAll(childSelector));
  children.forEach((child, index) => {
    animateElement(child, presetName, baseDelay + index * step);
  });
}

export function initAnimatedSections() {
  const sections = document.querySelectorAll('[data-animate="section"]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          target.classList.add('in-view');
          animateElement(target, target.dataset.preset || 'fadeInUp');

          const children = target.querySelectorAll('[data-animate-child]');
          children.forEach((child, index) => {
            const preset = child.dataset.preset || 'fadeInUp';
            const baseDelay = Number(child.dataset.delay || 40);
            const step = Number(child.dataset.step || 80);
            child.classList.add('in-view');
            animateElement(child, preset, baseDelay + index * step);
          });
          observer.unobserve(target);
        }
      });
    },
    { threshold: 0.2 }
  );

  sections.forEach((section) => {
    section.style.opacity = '0';
    section.style.transform = 'translate3d(0, 24px, 0)';
    observer.observe(section);
  });
}

prefersReducedMotionQuery.addEventListener('change', () => {
  document.documentElement.classList.toggle('reduced-motion', useReducedMotion());
});

document.documentElement.classList.toggle('reduced-motion', useReducedMotion());
