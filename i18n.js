// i18n.js - Internationalization module
const i18n = {
  currentLang: 'en',
  defaultLang: 'en',
  supportedLangs: ['en', 'es', 'fr', 'pt'],
  
  init() {
    // Get saved language or detect browser language
    const savedLang = localStorage.getItem('language');
    if (savedLang && this.supportedLangs.includes(savedLang)) {
      this.currentLang = savedLang;
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (this.supportedLangs.includes(browserLang)) {
        this.currentLang = browserLang;
      }
    }
    
    this.updatePage();
    this.updateLangSelector();
  },
  
  setLanguage(lang) {
    if (!this.supportedLangs.includes(lang)) {
      console.warn(`Language ${lang} not supported`);
      return;
    }
    
    this.currentLang = lang;
    localStorage.setItem('language', lang);
    this.updatePage();
    this.updateLangSelector();
  },
  
  updatePage() {
    // Update all elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = this.t(key);
      if (translation) {
        el.innerHTML = translation;
      }
    });
    
    // Update placeholders
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const translation = this.t(key);
      if (translation) {
        el.placeholder = translation;
      }
    });
    
    // Update html lang attribute
    document.documentElement.setAttribute('lang', this.currentLang);
    
    // Dispatch custom event for components that need to update
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: this.currentLang } }));
  },
  
  updateLangSelector() {
    const selector = document.getElementById('langSelector');
    if (selector) {
      selector.value = this.currentLang;
    }
  },
  
  t(key) {
    if (!translations || !translations[this.currentLang]) {
      console.warn('Translations not loaded');
      return key;
    }
    
    return translations[this.currentLang][key] || translations[this.defaultLang][key] || key;
  }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => i18n.init());
} else {
  i18n.init();
}
