/*
  SEO-optimierte DSGVO-Konfiguration für Elat Handels GmbH
  
  Ziel: Maximaler Datenschutz + Optimale Google-Rankings
  
  Diese Konfiguration stellt sicher, dass:
  1. Alle wichtigen Inhalte für Google indexierbar sind
  2. Benutzer maximal geschützt sind
  3. Website vollständig funktioniert ohne Cookies
  4. Tracking nur mit expliziter Zustimmung
*/

// SEO-Konfiguration: Was Google immer sehen kann
const SEO_ALWAYS_VISIBLE = {
  // Produktkatalog - vollständig für Google
  products: true,
  search: true,
  filters: true,
  navigation: true,
  
  // Unternehmensinformationen
  contact: true,
  about: true,
  legal: true,
  
  // Content-Seiten
  guides: true,
  blog: true,
  news: true
};

// Datenschutz-Konfiguration: Was nur mit Zustimmung lädt
const PRIVACY_PROTECTED = {
  // Tracking & Analytics
  googleAnalytics: 'analytics',
  facebookPixel: 'marketing',
  googleAds: 'marketing',
  
  // Personalisierung
  recommendations: 'functional',
  savedFilters: 'functional',
  wishlist: 'functional',
  
  // Externe Dienste
  chatWidget: 'marketing',
  socialMedia: 'marketing',
  maps: 'functional'
};

// Strukturierte Daten für Google (immer verfügbar)
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Elat Handels GmbH",
  "description": "Ihr zuverlässiger Partner für hochwertige Schmierstoffe und Öle Made in Germany",
  "url": "https://elathandels.de",
  "logo": "https://elathandels.de/bilder/Elat Logo.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Ihr Straße",
    "addressLocality": "Ihre Stadt", 
    "addressCountry": "DE"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+49-2306-912-9380",
    "contactType": "customer service",
    "email": "info@elathandels.de"
  },
  "sameAs": [
    // Social Media URLs falls vorhanden
  ]
};

// Google-freundliche Cookie-Banner-Konfiguration
const GOOGLE_FRIENDLY_SETUP = {
  // Banner erscheint erst nach 2 Sekunden (Google kann alles indexieren)
  bannerDelay: 2000,
  
  // Keine Blockierung von Content für Crawler
  respectRobots: true,
  
  // Schnelle Ladezeiten durch minimale JS-Blocking
  deferNonEssential: true,
  
  // Strukturierte Daten immer verfügbar
  alwaysLoadStructuredData: true
};

// Export für Integration
window.ELAT_SEO_CONFIG = {
  seoVisible: SEO_ALWAYS_VISIBLE,
  privacyProtected: PRIVACY_PROTECTED,
  structuredData: STRUCTURED_DATA,
  googleSetup: GOOGLE_FRIENDLY_SETUP
};

// Automatische Integration der strukturierten Daten
function addStructuredData() {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(STRUCTURED_DATA);
  document.head.appendChild(script);
}

// Beim Laden ausführen
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addStructuredData);
} else {
  addStructuredData();
}

console.log('✅ SEO-optimierte DSGVO-Konfiguration geladen - Maximaler Datenschutz + Google-Sichtbarkeit');
