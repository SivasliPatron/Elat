/**
 * Elat Kontaktseite JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // AOS initialisieren mit verbesserten Einstellungen
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: false,
        mirror: true,
        delay: 100,
        anchorPlacement: 'top-bottom'
    });
    
    // Kontaktformular initialisieren
    initContactForm();
    
    // Hintergrundmuster und visuelle Effekte initialisieren
    initVisualEffects();

    // Falls Parameter aus Produktdetail übergeben wurden, Formular vorbelegen
    prefillFromQuery();
});

/**
 * Initialisiert das Kontaktformular mit Validierung und verbesserten visuellen Effekten
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Formulareingaben mit verbesserten visuellen Effekten
        enhanceFormFields();
        
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Formular validieren
            if (validateForm()) {
                submitContactForm();
            }
        });
    }
}

/**
 * Liest URL-Parameter (produkt, artnr, viskositaet, message, subject) und
 * füllt das Kontaktformular sinnvoll vor. Felder werden nur gesetzt, wenn sie leer sind.
 * Scrollt optional zum Formular und fokussiert die Nachricht.
 */
function prefillFromQuery() {
    try {
        const params = new URLSearchParams(window.location.search);
        if (!params || [...params.keys()].length === 0) return;

        const produkt = params.get('produkt') || '';
        const artnr = params.get('artnr') || '';
        const visk = params.get('viskositaet') || params.get('viskosität') || '';
        const subjectParam = params.get('subject') || '';
        const messageParam = params.get('message') || '';

        const subjectEl = document.getElementById('subject');
        const messageEl = document.getElementById('message');

        // Betreff aufbauen, wenn leer
        if (subjectEl && !subjectEl.value) {
            const base = subjectParam || (produkt ? `Produktanfrage: ${produkt}` : 'Produktanfrage');
            subjectEl.value = base;
        }

        // Nachricht aufbauen, wenn leer
        if (messageEl && !messageEl.value) {
            if (messageParam) {
                messageEl.value = messageParam;
            } else {
                const lines = [];
                lines.push('Guten Tag,');
                if (produkt) {
                    lines.push('');
                    lines.push(`ich interessiere mich für folgendes Produkt:`);
                    lines.push(`• Produkt: ${produkt}`);
                    if (artnr) lines.push(`• Artikel-Nr.: ${artnr}`);
                    if (visk) lines.push(`• Viskosität: ${visk}`);
                }
                lines.push('');
                lines.push('Bitte senden Sie mir weitere Informationen, Verfügbarkeit und Preise zu.');
                lines.push('');
                lines.push('Vielen Dank und freundliche Grüße');
                messageEl.value = lines.join('\n');
            }
        }

        // Sanft zum Formular scrollen und Fokus setzen
        const form = document.getElementById('contactForm');
        if (form) {
            try { form.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (_) {}
        }
        if (messageEl) {
            messageEl.focus();
        }
    } catch (e) {
        // still render page
        console.warn('Prefill query parsing failed:', e);
    }
}

/**
 * Verbessert die Formulareingabefelder mit visuellen Effekten
 */
function enhanceFormFields() {
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    
    formInputs.forEach(input => {
        // Fokus-Effekt
        input.addEventListener('focus', function() {
            this.classList.add('field-focused');
            const label = this.previousElementSibling;
            if (label && label.tagName === 'LABEL') {
                label.style.color = 'var(--primary-color)';
                label.style.fontWeight = '500';
            }
        });
        
        // Verlust des Fokus
        input.addEventListener('blur', function() {
            this.classList.remove('field-focused');
            const label = this.previousElementSibling;
            if (label && label.tagName === 'LABEL' && !this.value) {
                label.style.color = '';
                label.style.fontWeight = '';
            }
        });
        
        // Input-Felder von Fehlermeldungen bereinigen, wenn sie geändert werden
        input.addEventListener('input', function() {
            this.classList.remove('form-error');
            const errorElement = this.parentElement.querySelector('.error-text');
            if (errorElement) {
                errorElement.remove();
            }
        });
    });
}

/**
 * Validiert das Kontaktformular
 * @returns {boolean} True wenn das Formular gültig ist, sonst false
 */
function validateForm() {
    let isValid = true;
    
    // Fehlermeldungen zurücksetzen
    clearFormErrors();
    
    // Pflichtfelder überprüfen
    const requiredFields = document.querySelectorAll('#contactForm [required]');
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showError(field, 'Dieses Feld ist erforderlich');
            isValid = false;
        }
    });
    
    // E-Mail-Format validieren
    const emailField = document.getElementById('email');
    if (emailField && emailField.value.trim() !== '') {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value)) {
            showError(emailField, 'Bitte geben Sie eine gültige E-Mail-Adresse ein');
            isValid = false;
        }
    }
    
    // Telefonnummer validieren (optional)
    const phoneField = document.getElementById('phone');
    if (phoneField && phoneField.value.trim() !== '') {
        const phonePattern = /^[+\d\s\-()]{6,20}$/;
        if (!phonePattern.test(phoneField.value)) {
            showError(phoneField, 'Bitte geben Sie eine gültige Telefonnummer ein');
            isValid = false;
        }
    }
    
    return isValid;
}

/**
 * Zeigt eine Fehlermeldung unter einem Formularfeld an
 * @param {HTMLElement} field - Das Formularfeld
 * @param {string} message - Die Fehlermeldung
 */
function showError(field, message) {
    field.classList.add('form-error');
    
    // Prüfen, ob bereits eine Fehlermeldung vorhanden ist
    const existingError = field.parentElement.querySelector('.error-text');
    if (!existingError) {
        const errorMessage = document.createElement('p');
        errorMessage.className = 'error-text';
        errorMessage.textContent = message;
        field.parentElement.appendChild(errorMessage);
    }
    
    // Animation hinzufügen
    field.classList.add('shake');
    
    // Animation nach Ende entfernen
    setTimeout(() => {
        field.classList.remove('shake');
    }, 600);
}

/**
 * Entfernt alle Fehlermeldungen im Formular
 */
function clearFormErrors() {
    const errorFields = document.querySelectorAll('#contactForm .form-error');
    errorFields.forEach(field => field.classList.remove('form-error'));
    
    const errorMessages = document.querySelectorAll('#contactForm .error-text');
    errorMessages.forEach(message => message.remove());
}

/**
 * Sendet das Kontaktformular ab mit verbesserter visueller Rückmeldung
 * In einer echten Umgebung würde hier ein API-Aufruf stattfinden
 */
function submitContactForm() {
    const form = document.getElementById('contactForm');
    const submitButton = document.getElementById('submitContactForm');
    const formData = new FormData(form);
    
    // Formularwerte erfassen
    const formValues = {};
    formData.forEach((value, key) => {
        formValues[key] = value;
    });
    
    console.log('Formular wird gesendet:', formValues);
    
    // Button-Status auf "wird gesendet" ändern mit Animation
    submitButton.disabled = true;
    submitButton.innerHTML = `
        <svg class="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg> 
        Wird gesendet...
    `;
    
    // Hier würde normalerweise ein API-Aufruf stattfinden
    // Stattdessen simulieren wir einen erfolgreichen Versand mit Zeitverzögerung
    setTimeout(() => {
        // Erfolgsbenachrichtigung im Button anzeigen
        submitButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Nachricht erfolgreich gesendet!
        `;
        submitButton.classList.remove('bg-gradient-to-r', 'from-primary', 'to-blue-600');
        submitButton.classList.add('bg-green-600');
        
        // Erfolgsmeldung anzeigen
        showSuccessMessage();
        
        // Formular zurücksetzen
        form.reset();
        
        // Nach kurzer Zeit Button wieder auf ursprünglichen Status setzen
        setTimeout(() => {
            submitButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <span class="tracking-wide">Nachricht senden</span>
            `;
            submitButton.classList.remove('bg-green-600');
            submitButton.classList.add('bg-gradient-to-r', 'from-primary', 'to-blue-600');
            submitButton.disabled = false;
        }, 3000);
    }, 2000);
}

/**
 * Zeigt eine Erfolgsmeldung nach dem Absenden des Formulars an
 */
function showSuccessMessage() {
    // Vorhandene Erfolgsmeldungen entfernen
    const existingSuccess = document.querySelector('.success-message');
    if (existingSuccess) {
        existingSuccess.remove();
    }
    
    // Neue Erfolgsnachricht erstellen
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.style.backgroundColor = '#d1fae5';
    successMessage.style.borderLeft = '4px solid #10b981';
    successMessage.style.color = '#047857';
    successMessage.style.padding = '1rem';
    successMessage.style.marginBottom = '1.5rem';
    successMessage.style.borderRadius = '0.375rem';
    successMessage.style.display = 'flex';
    successMessage.style.alignItems = 'center';
    successMessage.style.opacity = '1';
    successMessage.style.transition = 'opacity 0.5s ease';
    
    successMessage.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <span>Vielen Dank für Ihre Nachricht! Wir werden uns so schnell wie möglich bei Ihnen melden.</span>
    `;
    
    // Erfolgsnachricht einfügen
    const form = document.getElementById('contactForm');
    form.parentElement.insertBefore(successMessage, form);
    
    // Nach 5 Sekunden automatisch ausblenden
    setTimeout(() => {
        successMessage.style.opacity = '0';
        
        setTimeout(() => {
            successMessage.remove();
        }, 500);
    }, 5000);
}

/**
 * Initialisiert visuelle Effekte für die Seite
 */
function initVisualEffects() {
    // Hintergrundmuster für den Hero-Bereich
    const patternElements = document.querySelectorAll('.bg-pattern-dots');
    patternElements.forEach(element => {
        element.style.backgroundImage = 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)';
        element.style.backgroundSize = '20px 20px';
    });
    
    // Parallax-Effekt für den Hero-Bereich
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const heroSection = document.querySelector('.bg-gradient-to-r.from-blue-800');
        
        if (heroSection) {
            heroSection.style.backgroundPosition = `0px ${scrollPosition * 0.05}px`;
        }
    });
}

// Event-Listener hinzufügen, um das Formular zu löschen, wenn ein neues Formular angezeigt wird
document.addEventListener('showContactForm', function() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.reset();
        clearFormErrors();
        
        // Vorhandene Erfolgsnachrichten entfernen
        const existingSuccess = document.querySelector('.success-message');
        if (existingSuccess) {
            existingSuccess.remove();
        }
    }
});
