/**
 * Gemeinsame JavaScript-Funktionen für alle Seiten
 */

// Mobile Menü Toggle - wird auf allen Seiten benötigt
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        // Remove existing listeners to prevent duplicates
        menuToggle.removeEventListener('click', toggleMobileMenu);
        
        // Add click listener
        menuToggle.addEventListener('click', toggleMobileMenu);

        // Ensure initial ARIA state
        const isHidden = mobileMenu.classList.contains('hidden');
        menuToggle.setAttribute('aria-expanded', (!isHidden).toString());
        menuToggle.setAttribute('aria-label', isHidden ? 'Menü öffnen' : 'Menü schließen');
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!menuToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    // Update ARIA when closing due to outside click
                    menuToggle.setAttribute('aria-expanded', 'false');
                    menuToggle.setAttribute('aria-label', 'Menü öffnen');
                    menuToggle.title = 'Menü öffnen';
                }
            }
        });
        
        console.log('Mobile menu initialized successfully');
    } else {
        console.warn('Mobile menu elements not found:', { menuToggle, mobileMenu });
    }
}

// Toggle function for mobile menu
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuToggle = document.getElementById('menu-toggle');
    if (mobileMenu) {
        const willBeOpen = mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('hidden');
        // Update ARIA state and title accordingly
        if (menuToggle) {
            menuToggle.setAttribute('aria-expanded', willBeOpen ? 'true' : 'false');
            const label = willBeOpen ? 'Menü schließen' : 'Menü öffnen';
            menuToggle.setAttribute('aria-label', label);
            menuToggle.title = label;
        }
        console.log('Mobile menu toggled, hidden class:', mobileMenu.classList.contains('hidden'));
    }
}

// Automatische Initialisierung beim Laden der Seite
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing mobile menu...');
    initMobileMenu();
});
