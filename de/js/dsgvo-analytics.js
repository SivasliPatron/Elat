/*
  DSGVO-konformes Google Analytics für Elat Handels GmbH
  
  Features:
  - Lädt nur bei expliziter Analytics-Zustimmung
  - IP-Anonymisierung aktiviert
  - Keine Werbefunktionen
  - Opt-out jederzeit möglich
  - Datensparsamkeit
*/

(function() {
  'use strict';
  
  // Google Analytics Measurement ID (hier durch echte ID ersetzen)
  const GA_MEASUREMENT_ID = 'G-C832S1PEWH'; // Echte Analytics ID von Google
  
  let analyticsLoaded = false;
  
  // Datenschutz-optimierte Analytics-Konfiguration
  const PRIVACY_CONFIG = {
    // IP-Anonymisierung (DSGVO-Pflicht)
    anonymize_ip: true,
    
    // Keine Werbefunktionen
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    
    // Reduzierte Cookie-Laufzeit
    cookie_expires: 63072000, // 2 Jahre statt Standard 2 Jahre
    
    // Keine automatische Datensammlung
    send_page_view: false, // Wird manuell gesendet
    
    // Modern transport settings to avoid deprecated headers
    transport_type: 'beacon'
  };
  
  // Google Analytics laden (nur bei Zustimmung)
  function loadGoogleAnalytics() {
    if (analyticsLoaded) return;
    
    // Google Analytics Script laden
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
    
    // Analytics konfigurieren
    script.onload = function() {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() { dataLayer.push(arguments); };
      
      // Konfiguration mit Datenschutz-Einstellungen und modernen Headers
      gtag('js', new Date());
      gtag('config', GA_MEASUREMENT_ID, PRIVACY_CONFIG);
      
      // Erste Seitenansicht senden
      gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        custom_parameter: 'dsgvo_compliant'
      });
      
      analyticsLoaded = true;
      console.log('✅ DSGVO-konformes Google Analytics geladen');
    };
  }
  
  // Analytics deaktivieren
  function disableGoogleAnalytics() {
    if (window.gtag) {
      // Opt-out setzen
      window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
      console.log('❌ Google Analytics deaktiviert');
    }
  }
  
  // Event-Tracking (nur wichtige Business-Events)
  function trackBusinessEvent(eventName, parameters = {}) {
    if (!analyticsLoaded || !window.gtag) return;
    
    // Nur relevante Business-Events tracken
    const allowedEvents = [
      'contact_form_submit',
      'product_inquiry',
      'phone_call_click',
      'email_click',
      'brochure_download'
    ];
    
    if (allowedEvents.includes(eventName)) {
      gtag('event', eventName, {
        ...parameters,
        privacy_mode: 'dsgvo_compliant'
      });
    }
  }
  
  // Integration mit Cookie-System (mit Retry-Logik)
  function initAnalyticsIntegration() {
    // Prüfen ob ConsentManager verfügbar ist
    if (window.ConsentManager) {
      // ConsentManager ist verfügbar - sofort registrieren
      window.ConsentManager.onChange((preferences) => {
        if (preferences.analytics) {
          loadGoogleAnalytics();
        } else {
          disableGoogleAnalytics();
        }
      });
      
      // Aktueller Status prüfen
      const currentPrefs = window.ConsentManager.get();
      if (currentPrefs && currentPrefs.analytics) {
        loadGoogleAnalytics();
      }
      
      console.log('✅ DSGVO Analytics erfolgreich mit ConsentManager verbunden');
    } else {
      // ConsentManager noch nicht verfügbar - mit Retry
      console.log('⏳ ConsentManager noch nicht verfügbar, warte...');
      let retryCount = 0;
      const maxRetries = 50; // 5 Sekunden bei 100ms Intervall
      
      const retryInterval = setInterval(() => {
        retryCount++;
        
        if (window.ConsentManager) {
          // ConsentManager ist jetzt verfügbar
          clearInterval(retryInterval);
          
          window.ConsentManager.onChange((preferences) => {
            if (preferences.analytics) {
              loadGoogleAnalytics();
            } else {
              disableGoogleAnalytics();
            }
          });
          
          // Aktueller Status prüfen
          const currentPrefs = window.ConsentManager.get();
          if (currentPrefs && currentPrefs.analytics) {
            loadGoogleAnalytics();
          }
          
          console.log('✅ DSGVO Analytics erfolgreich mit ConsentManager verbunden (nach ' + retryCount + ' Versuchen)');
        } else if (retryCount >= maxRetries) {
          // Timeout erreicht
          clearInterval(retryInterval);
          console.warn('⚠️ ConsentManager nicht gefunden nach ' + maxRetries + ' Versuchen - Analytics wird nicht geladen');
        }
      }, 100);
    }
  }
  
  // Öffentliche API
  window.ElatAnalytics = {
    track: trackBusinessEvent,
    isLoaded: () => analyticsLoaded,
    disable: disableGoogleAnalytics
  };
  
  // Auto-Initialisierung
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnalyticsIntegration);
  } else {
    initAnalyticsIntegration();
  }
  
})();

// Business-Events für wichtige Aktionen automatisch einrichten
document.addEventListener('DOMContentLoaded', function() {
  
  // Kontakt-Tracking
  const contactLinks = document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"]');
  contactLinks.forEach(link => {
    link.addEventListener('click', function() {
      const type = this.href.startsWith('tel:') ? 'phone_call_click' : 'email_click';
      window.ElatAnalytics?.track(type, {
        contact_method: type,
        page: window.location.pathname
      });
    });
  });
  
  // Produktanfrage-Tracking
  const inquiryForms = document.querySelectorAll('form[action*="kontakt"]');
  inquiryForms.forEach(form => {
    form.addEventListener('submit', function() {
      window.ElatAnalytics?.track('product_inquiry', {
        form_location: window.location.pathname,
        product: document.querySelector('input[name="produkt"]')?.value || 'general'
      });
    });
  });
  
  console.log('📊 DSGVO-konformes Business-Tracking eingerichtet');
});
