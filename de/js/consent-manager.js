/*
  Consent Manager for Elat Handels GmbH
  - Stores consent in both localStorage and a cookie (elat-cookie-consent)
  - Categories: necessary (always true), analytics, marketing, functional
  - UI: banner + modal
  - Public API: window.ConsentManager
      .get()
      .set(prefs)
      .has(category)
      .open()
      .onChange(cb)
  - Defer loading for elements with [data-consent] and data-src/data-href
*/
(function () {
  const STORAGE_KEY = 'elat-cookie-consent';
  const COOKIE_NAME = 'elat-cookie-consent';
  const COOKIE_MAX_AGE_DAYS = 90; // Nur 3 Monate für maximalen Datenschutz

  const defaultPrefs = {
    necessary: true,    // Gesetzlich erforderlich - immer aktiv
    analytics: false,   // STANDARD AUS für maximalen Datenschutz
    marketing: false,   // STANDARD AUS für maximalen Datenschutz  
    functional: false,  // STANDARD AUS für maximalen Datenschutz
    timestamp: null,
    version: 1
  };

  function readCookie(name) {
    const match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
  }

  function writeCookie(name, value, days) {
    const maxAge = days ? days * 24 * 60 * 60 : undefined;
    const parts = [name + '=' + encodeURIComponent(value), 'path=/', 'SameSite=Lax'];
    // If page is served over https, add Secure
    if (location.protocol === 'https:') parts.push('Secure');
    if (maxAge) parts.push('Max-Age=' + maxAge);
    document.cookie = parts.join('; ');
  }

  function loadPrefs() {
    try {
      const ls = localStorage.getItem(STORAGE_KEY);
      if (ls) return JSON.parse(ls);
    } catch (e) {}
    try {
      const ck = readCookie(COOKIE_NAME);
      if (ck) return JSON.parse(ck);
    } catch (e) {}
    return { ...defaultPrefs };
  }

  function savePrefs(prefs) {
    const data = JSON.stringify(prefs);
    try { localStorage.setItem(STORAGE_KEY, data); } catch (e) {}
    writeCookie(COOKIE_NAME, data, COOKIE_MAX_AGE_DAYS);
  }

  function applyConsentToDeferredElements(prefs) {
    const nodes = document.querySelectorAll('[data-consent]');
    nodes.forEach(node => {
      const category = node.getAttribute('data-consent');
      if (!category || category === 'necessary') return;
      if (!prefs[category]) return;
      
      // Skip if already loaded
      if (node.hasAttribute('data-consent-loaded')) return;
      
      // Load now
      if (node.tagName === 'SCRIPT') {
        loadScript(node);
      } else if (node.tagName === 'LINK') {
        loadStylesheet(node);
      } else if (node.tagName === 'IFRAME') {
        loadIframe(node);
      } else {
        loadGeneric(node);
      }
      
      // Mark as loaded
      node.setAttribute('data-consent-loaded', 'true');
    });
  }

  function loadScript(node) {
    const src = node.getAttribute('data-src');
    if (!src || node.getAttribute('src')) return;
    
    const script = document.createElement('script');
    const timeout = parseInt(node.getAttribute('data-timeout')) || 10000;
    let loaded = false;
    
    // Copy attributes
    Array.from(node.attributes).forEach(attr => {
      if (attr.name !== 'data-src' && attr.name !== 'data-consent') {
        script.setAttribute(attr.name, attr.value);
      }
    });
    
    script.onload = () => {
      if (loaded) return;
      loaded = true;
      node.setAttribute('src', src);
      // Dispatch custom event for script loaded
      node.dispatchEvent(new CustomEvent('consent-script-loaded', { 
        detail: { src, success: true } 
      }));
    };
    
    script.onerror = () => {
      if (loaded) return;
      loaded = true;
      console.warn('Failed to load consent script:', src);
      node.dispatchEvent(new CustomEvent('consent-script-loaded', { 
        detail: { src, success: false, error: 'Load failed' } 
      }));
    };
    
    // Timeout handling
    setTimeout(() => {
      if (!loaded) {
        loaded = true;
        console.warn('Timeout loading consent script:', src);
        node.dispatchEvent(new CustomEvent('consent-script-loaded', { 
          detail: { src, success: false, error: 'Timeout' } 
        }));
      }
    }, timeout);
    
    script.src = src;
    node.parentNode.insertBefore(script, node.nextSibling);
  }

  function loadStylesheet(node) {
    const href = node.getAttribute('data-href');
    if (!href || node.getAttribute('href')) return;
    
    node.setAttribute('href', href);
    node.removeAttribute('data-href');
  }

  function loadIframe(node) {
    const src = node.getAttribute('data-src');
    if (!src || node.getAttribute('src')) return;
    
    node.setAttribute('src', src);
    node.removeAttribute('data-src');
  }

  function loadGeneric(node) {
    const src = node.getAttribute('data-src');
    if (!src) return;
    
    // For IMG or others
    node.setAttribute('src', src);
    node.removeAttribute('data-src');
  }

  function createUI() {
    if (document.getElementById('consent-banner')) return; // already exists

    const style = document.createElement('style');
    style.textContent = `
      .consent-overlay{position:fixed;inset:0;background:rgba(0,0,0,0);display:none;z-index:9998;transition:background-color .3s ease;-webkit-backdrop-filter:blur(0px);backdrop-filter:blur(0px);pointer-events:none}
      .consent-overlay.show{background:rgba(0,0,0,.5);-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);pointer-events:auto}
      .consent-modal{position:fixed;left:50%;top:50%;transform:translate(-50%,-60%);background:#fff;color:#000;border-radius:16px;max-width:600px;width:95%;max-height:90vh;overflow-y:auto;box-shadow:0 25px 80px rgba(0,0,0,.15);z-index:9999;transition:all .3s cubic-bezier(.2,.8,.2,1);opacity:0;scale:.8;pointer-events:none;visibility:hidden}
      .consent-modal.show{transform:translate(-50%,-50%);opacity:1;scale:1;pointer-events:auto;visibility:visible}
      .consent-modal-header{padding:20px 24px 16px;border-bottom:1px solid #f1f5f9;font-weight:700;font-size:18px;display:flex;justify-content:space-between;align-items:center}
      .consent-modal-close{background:none;border:none;font-size:24px;cursor:pointer;color:#64748b;padding:0;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;transition:all .2s}
      .consent-modal-close:hover{background:#f1f5f9;color:#334155}
      .consent-modal-body{padding:16px 24px 20px}
      .consent-modal-footer{padding:16px 24px 20px;display:flex;gap:12px;justify-content:flex-end;border-top:1px solid #f1f5f9;flex-wrap:wrap}
      .consent-check{display:flex;align-items:flex-start;gap:16px;margin:16px 0;padding:16px;border-radius:12px;transition:background .2s;cursor:pointer}
      .consent-check:hover{background:#f8fafc}
      .consent-check.disabled{opacity:.7;cursor:not-allowed}
      .consent-check.disabled:hover{background:transparent}
      .consent-banner{position:fixed;left:0;right:0;bottom:0;background:#111827;color:#e5e7eb;padding:16px 0;border-top:1px solid #374151;z-index:9997;transform:translateY(100%);transition:transform .4s cubic-bezier(.2,.8,.2,1);box-shadow:0 -10px 25px rgba(0,0,0,.1);max-height:50vh;overflow-y:auto}
      .consent-banner.show{transform:translateY(0)}
      .consent-banner .btn{background:#B83232;color:#fff;border:none;border-radius:8px;padding:12px 16px;font-weight:600;cursor:pointer;transition:all .2s;white-space:nowrap;font-size:14px;min-height:44px;display:flex;align-items:center;justify-content:center}
      .consent-banner .btn:hover{background:#a02828;transform:translateY(-1px);box-shadow:0 4px 12px rgba(184,50,50,.3)}
      .consent-banner .btn-primary{background:#B83232}
      .consent-banner .btn-secondary{background:#374151;color:#e5e7eb}
      .consent-banner .btn-secondary:hover{background:#475569}
      .consent-banner .btn-tertiary{background:transparent;border:1px solid #4b5563;color:#e5e7eb}
      .consent-banner .btn-tertiary:hover{background:#374151;border-color:#6b7280}
      .consent-modal .btn{background:#B83232;color:#fff;border:none;border-radius:10px;padding:12px 24px;font-weight:600;cursor:pointer;transition:all .2s;min-width:120px}
      .consent-modal .btn:hover{background:#a02828;transform:translateY(-1px);box-shadow:0 4px 12px rgba(184,50,50,.3)}
      .consent-modal .btn-secondary{background:#64748b;color:#fff}
      .consent-modal .btn-secondary:hover{background:#475569}
      .consent-link{color:#B83232;cursor:pointer;text-decoration:underline}
      .consent-link:hover{color:#a02828}
      .consent-small{font-size:13px;color:#64748b;line-height:1.4;margin-top:4px}
      .consent-switch{width:48px;height:28px;background:#e2e8f0;border-radius:999px;position:relative;cursor:pointer;transition:background .3s;flex-shrink:0}
      .consent-switch:hover{background:#cbd5e1}
      .consent-switch:after{content:'';position:absolute;top:2px;left:2px;width:24px;height:24px;background:#fff;border-radius:999px;box-shadow:0 2px 4px rgba(0,0,0,.1);transition:all .3s cubic-bezier(.2,.8,.2,1)}
      .consent-input:checked + .consent-switch{background:#10b981}
      .consent-input:checked + .consent-switch:hover{background:#059669}
      .consent-input:checked + .consent-switch:after{transform:translateX(20px)}
  /* Visually hide real inputs but keep them accessible */
  .consent-input{position:absolute;opacity:0;width:1px;height:1px;margin:0;padding:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;border:0}
      .consent-input:focus + .consent-switch{outline:2px solid #B83232;outline-offset:2px}
      .consent-category-title{font-weight:600;color:#1e293b;margin-bottom:2px}
      @media (max-width: 640px) {
        .consent-modal{width:98%;max-height:95vh;border-radius:12px 12px 0 0;position:fixed;top:auto;bottom:0;left:50%;transform:translate(-50%,100%)}
        .consent-modal.show{transform:translate(-50%,0)}
        .consent-modal-footer{flex-direction:column}
        .consent-modal .btn{width:100%}
        .consent-banner{padding:12px 0;max-height:60vh}
        .consent-banner .btn{width:100%;margin:0;font-size:16px;padding:14px 16px}
        .consent-check{flex-direction:column;align-items:flex-start;gap:8px;padding:12px}
        .consent-small{font-size:14px;line-height:1.5}
      }
      @media (max-width: 480px) {
        .consent-banner{max-height:70vh}
        .consent-banner .container{padding-left:12px;padding-right:12px}
        .consent-banner .btn{font-size:15px;padding:12px 14px}
      }
    `;
    document.head.appendChild(style);

    const banner = document.createElement('div');
    banner.id = 'consent-banner';
    banner.className = 'consent-banner';
    banner.setAttribute('role', 'banner');
    banner.setAttribute('aria-label', 'Cookie-Einstellungen');
    banner.innerHTML = `
      <div class="container mx-auto px-4 py-2">
        <div class="flex flex-col gap-3">
          <div class="text-center md:text-left">
            <div class="font-semibold text-lg mb-1">
              🔒 Datenschutz hat Priorität
            </div>
            <div class="consent-small text-sm leading-relaxed">Wir respektieren Ihre Privatsphäre! Diese Website funktioniert vollständig ohne Tracking. Optional können Sie zusätzliche Funktionen aktivieren. <a href="datenschutz.html" class="underline text-blue-300">Mehr erfahren</a></div>
          </div>
          <div class="flex flex-col sm:flex-row gap-2 sm:justify-center md:justify-start">
            <button class="btn btn-tertiary" data-action="reject-all" aria-label="Datenschutz-optimal: Nur notwendige Cookies">🔒 Datenschutz-optimal</button>
            <button class="btn btn-secondary" data-action="settings" aria-label="Cookie-Einstellungen anpassen">⚙️ Anpassen</button>
            <button class="btn btn-primary" data-action="accept-all" aria-label="Alle Cookies für bessere Funktionen akzeptieren">Alle akzeptieren</button>
          </div>
        </div>
      </div>
    `;

    const overlay = document.createElement('div');
    overlay.className = 'consent-overlay';
    overlay.id = 'consent-overlay';

    const modal = document.createElement('div');
    modal.className = 'consent-modal';
    modal.id = 'consent-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'consent-modal-title');
    modal.setAttribute('aria-modal', 'true');
    modal.innerHTML = `
      <div class="consent-modal-header">
        <div id="consent-modal-title">Cookie-Einstellungen</div>
        <button class="consent-modal-close" data-action="close" aria-label="Schließen">&times;</button>
      </div>
      <div class="consent-modal-body">
        <p class="consent-small" style="margin-bottom:20px;">🔒 <strong>Ihre Privatsphäre ist uns wichtig!</strong> Wählen Sie selbst, welche optionalen Funktionen Sie nutzen möchten. Die Website funktioniert vollständig auch ohne zusätzliche Cookies. <a href="datenschutz.html" target="_blank" class="underline">Datenschutzerklärung</a></p>
        <div class="consent-check disabled">
          <input id="consent-necessary" class="consent-input" type="checkbox" checked disabled aria-describedby="desc-necessary" aria-labelledby="label-necessary">
          <label class="consent-switch" for="consent-necessary"></label>
          <div class="flex-1">
            <div class="consent-category-title" id="label-necessary">✅ Notwendig (immer aktiv)</div>
            <div class="consent-small" id="desc-necessary">Nur für Grundfunktionen: Navigation, Cookie-Einstellungen speichern. Keine Verfolgung oder Analyse.</div>
          </div>
        </div>
        <div class="consent-check">
          <input id="consent-functional" class="consent-input" type="checkbox" aria-describedby="desc-functional" aria-labelledby="label-functional">
          <label class="consent-switch" for="consent-functional"></label>
          <div class="flex-1">
            <div class="consent-category-title" id="label-functional">⚙️ Funktional (optional)</div>
            <div class="consent-small" id="desc-functional"><strong>Keine Verfolgung!</strong> Nur für Komfort: AOS-Animationen, gespeicherte Filtereinstellungen. Verarbeitung erfolgt lokal.</div>
          </div>
        </div>
        <div class="consent-check">
          <input id="consent-analytics" class="consent-input" type="checkbox" aria-describedby="desc-analytics" aria-labelledby="label-analytics">
          <label class="consent-switch" for="consent-analytics"></label>
          <div class="flex-1">
            <div class="consent-category-title" id="label-analytics">📊 Analyse (optional)</div>
            <div class="consent-small" id="desc-analytics"><strong>Für Website-Verbesserung:</strong> Anonyme Statistiken über Seitenaufrufe. Keine personenbezogenen Daten, IP-Adressen anonymisiert.</div>
          </div>
        </div>
        <div class="consent-check">
          <input id="consent-marketing" class="consent-input" type="checkbox" aria-describedby="desc-marketing" aria-labelledby="label-marketing">
          <label class="consent-switch" for="consent-marketing"></label>
          <div class="flex-1">
            <div class="consent-category-title" id="label-marketing">🎯 Marketing (optional)</div>
            <div class="consent-small" id="desc-marketing"><strong>Vollständig optional:</strong> Personalisierte Produktempfehlungen und zielgerichtete Werbung. Sie können dies jederzeit deaktivieren.</div>
          </div>
        </div>
      </div>
      <div class="consent-modal-footer">
        <button class="btn btn-secondary" data-action="reject-all" aria-label="Nur notwendige Cookies akzeptieren">Nur notwendige</button>
        <button class="btn" data-action="save" aria-label="Einstellungen speichern">Speichern</button>
      </div>
    `;

    document.body.appendChild(banner);
    document.body.appendChild(overlay);
    document.body.appendChild(modal);

    return { banner, overlay, modal };
  }

  function openModal(ui, prefs) {
    // sync switches
    const functional = ui.modal.querySelector('#consent-functional');
    const analytics = ui.modal.querySelector('#consent-analytics');
    const marketing = ui.modal.querySelector('#consent-marketing');
    functional.checked = !!prefs.functional;
    analytics.checked = !!prefs.analytics;
    marketing.checked = !!prefs.marketing;

    // Show with animation
    ui.overlay.style.display = 'block';
    ui.modal.style.display = 'block';
    
    // Reset styles for proper interaction
    ui.overlay.style.pointerEvents = '';
    ui.modal.style.pointerEvents = '';
    ui.modal.style.visibility = '';
    
    // Trigger reflow for animation
    ui.overlay.offsetHeight;
    ui.modal.offsetHeight;
    
    ui.overlay.classList.add('show');
    ui.modal.classList.add('show');
    
    // Focus management
    const firstFocusable = ui.modal.querySelector('button, input, [tabindex]:not([tabindex="-1"])');
    if (firstFocusable) firstFocusable.focus();
    
    // Trap focus
    document.addEventListener('keydown', trapFocus);
    
    // Store previously focused element
    ui._previousFocus = document.activeElement;
  }

  function closeModal(ui) {
    ui.overlay.classList.remove('show');
    ui.modal.classList.remove('show');
    
    // Immediately disable pointer events
    ui.overlay.style.pointerEvents = 'none';
    ui.modal.style.pointerEvents = 'none';
    ui.modal.style.visibility = 'hidden';
    
    // Remove focus trap
    document.removeEventListener('keydown', trapFocus);
    
    // Restore focus
    if (ui._previousFocus) {
      ui._previousFocus.focus();
      ui._previousFocus = null;
    }
    
    setTimeout(() => {
      if (!ui.modal.classList.contains('show')) {
        ui.overlay.style.display = 'none';
        ui.modal.style.display = 'none';
      }
    }, 300);
  }

  function trapFocus(e) {
    if (e.key !== 'Tab') return;
    
    const modal = document.getElementById('consent-modal');
    if (!modal || !modal.classList.contains('show')) return;
    
    const focusables = modal.querySelectorAll('button, input, [tabindex]:not([tabindex="-1"])');
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function hideBanner(ui) {
    ui.banner.classList.remove('show');
    setTimeout(() => {
      ui.banner.style.display = 'none';
    }, 400);
  }

  function showBanner(ui) {
    ui.banner.style.display = '';
    // Trigger reflow for animation
    ui.banner.offsetHeight;
    ui.banner.classList.add('show');
  }

  function init() {
    const prefs = loadPrefs();
    const ui = createUI();

    const callbacks = new Set();

    function set(p) {
      const merged = { ...defaultPrefs, ...p, timestamp: new Date().toISOString() };
      savePrefs(merged);
      applyConsentToDeferredElements(merged);
      hideBanner(ui);
      callbacks.forEach(cb => { try { cb(merged); } catch (e) {} });
      return merged;
    }

    function get() {
      return loadPrefs();
    }

    function has(category) {
      const prefs = loadPrefs();
      return !!prefs[category];
    }

    function onChange(cb) { callbacks.add(cb); return () => callbacks.delete(cb); }

    // Wire banner buttons
    ui.banner.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-action]');
      if (!btn) return;
      const action = btn.getAttribute('data-action');
      if (action === 'accept-all') {
        set({ necessary: true, functional: true, analytics: true, marketing: true });
      } else if (action === 'reject-all') {
        set({ necessary: true, functional: false, analytics: false, marketing: false });
      } else if (action === 'settings') {
        openModal(ui, loadPrefs());
      }
    });

    // Wire modal buttons
    ui.modal.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-action]');
      if (!btn) return;
      const action = btn.getAttribute('data-action');
      if (action === 'save') {
        const functional = ui.modal.querySelector('#consent-functional').checked;
        const analytics = ui.modal.querySelector('#consent-analytics').checked;
        const marketing = ui.modal.querySelector('#consent-marketing').checked;
        set({ necessary: true, functional, analytics, marketing });
        closeModal(ui);
      } else if (action === 'reject-all') {
        set({ necessary: true, functional: false, analytics: false, marketing: false });
        closeModal(ui);
      } else if (action === 'close') {
        closeModal(ui);
      }
    });

    // Close on overlay click
    ui.overlay.addEventListener('click', (e) => {
      if (e.target === ui.overlay) closeModal(ui);
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && ui.modal.classList.contains('show')) {
        closeModal(ui);
      }
    });

    // Click handler for consent checks (for better mobile UX)
    ui.modal.addEventListener('click', (e) => {
      const check = e.target.closest('.consent-check:not(.disabled)');
      if (!check) return;
      const input = check.querySelector('input');
      if (input && e.target !== input && !e.target.closest('.consent-switch')) {
        input.checked = !input.checked;
        input.dispatchEvent(new Event('change'));
      }
    });

    // Initial state: if timestamp exists, hide banner; else show
    if (prefs && prefs.timestamp) {
      hideBanner(ui);
      applyConsentToDeferredElements(prefs);
    } else {
      showBanner(ui);
    }

    window.ConsentManager = {
      get,
      set,
      has,
      open: () => openModal(ui, loadPrefs()),
      onChange
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
