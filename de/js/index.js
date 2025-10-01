// Scroll-Animation für die Produktkategorien
document.addEventListener('DOMContentLoaded', function() {
    // Fade-in-Animation beim Scrollen
    const fadeElements = document.querySelectorAll('.relative.overflow-hidden');
    
    function fadeInOnScroll() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('opacity-100');
            }
        });
    }
    
    // Initialisiere Fade-Elemente
    fadeElements.forEach(element => {
        element.classList.add('opacity-0', 'transition-opacity', 'duration-1000');
    });
    
    // Führe Animation aus, wenn Seite geladen ist
    setTimeout(fadeInOnScroll, 200);
    
    // Event Listener für Scroll-Animation
    window.addEventListener('scroll', fadeInOnScroll);

    // FAQ Funktionalität initialisieren
    initializeFAQ();
});

// FAQ Main Toggle Funktionalität
function initializeFAQ() {
    const faqTrigger = document.getElementById('faq-trigger');
    const faqContent = document.getElementById('faq-content');
    const faqClose = document.getElementById('faq-close');
    const faqArrow = document.getElementById('faq-arrow');
    
    // FAQ Sektion öffnen
    if (faqTrigger) {
        faqTrigger.addEventListener('click', function() {
            faqContent.classList.remove('hidden');
            faqArrow.style.transform = 'rotate(180deg)';
            
            // Smooth scroll zur FAQ-Sektion
            setTimeout(() => {
                faqContent.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }, 100);
        });
    }
    
    // FAQ Sektion schließen
    if (faqClose) {
        faqClose.addEventListener('click', function() {
            faqContent.classList.add('hidden');
            faqArrow.style.transform = 'rotate(0deg)';
            
            // Scroll zurück zum Trigger
            setTimeout(() => {
                faqTrigger.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }, 100);
        });
    }
    
    // Individuelle FAQ Items (Accordion innerhalb der FAQ-Sektion)
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            const answer = faqItem.querySelector('.faq-answer');
            const icon = this.querySelector('.faq-icon');
            
            // Aktuelles FAQ-Item umschalten
            if (answer.classList.contains('hidden')) {
                answer.classList.remove('hidden');
                icon.classList.add('rotated');
                
                // Smooth scroll zu dem geöffneten FAQ-Item
                setTimeout(() => {
                    faqItem.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest'
                    });
                }, 100);
            } else {
                answer.classList.add('hidden');
                icon.classList.remove('rotated');
            }
        });
    });
}

// Globale FAQ-Funktionen für erweiterte Nutzung
window.toggleMainFAQ = function() {
    const faqContent = document.getElementById('faq-content');
    const faqArrow = document.getElementById('faq-arrow');
    
    if (faqContent.classList.contains('hidden')) {
        faqContent.classList.remove('hidden');
        faqArrow.style.transform = 'rotate(180deg)';
    } else {
        faqContent.classList.add('hidden');
        faqArrow.style.transform = 'rotate(0deg)';
    }
};

window.toggleFAQ = function(index) {
    const questions = document.querySelectorAll('.faq-question');
    if (questions[index]) {
        questions[index].click();
    }
};

window.openAllFAQ = function() {
    const answers = document.querySelectorAll('.faq-answer');
    const icons = document.querySelectorAll('.faq-icon');
    
    answers.forEach(answer => answer.classList.remove('hidden'));
    icons.forEach(icon => icon.classList.add('rotated'));
};

window.closeAllFAQ = function() {
    const answers = document.querySelectorAll('.faq-answer');
    const icons = document.querySelectorAll('.faq-icon');
    
    answers.forEach(answer => answer.classList.add('hidden'));
    icons.forEach(icon => icon.classList.remove('rotated'));
};
