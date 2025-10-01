/* =============================================================================
   Extracted Inline JavaScript from datenschutz.html
   Date: 2025-09-27
   Purpose: AOS initialization, dark mode toggle, and scroll effects that were inline
============================================================================= */

document.addEventListener('DOMContentLoaded', () => {
    // Note: AOS initialization is handled at the end of this file with consent awareness
    
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('theme-toggle');
    const darkToggleMobile = document.getElementById('theme-toggle-mobile');
    const html = document.documentElement;
    
    // Check for saved user preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Set initial state
    if (isDarkMode) {
        html.classList.add('dark');
        if (darkModeToggle) {
            darkModeToggle.querySelector('.fa-sun').classList.add('hidden');
            darkModeToggle.querySelector('.fa-moon').classList.remove('hidden');
        }
        if (darkToggleMobile) {
            darkToggleMobile.querySelector('.fa-sun').classList.add('hidden');
            darkToggleMobile.querySelector('.fa-moon').classList.remove('hidden');
        }
    }
    
    // Toggle dark mode when button is clicked
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            html.classList.toggle('dark');
            
            const isDark = html.classList.contains('dark');
            localStorage.setItem('darkMode', isDark);
            
            // Toggle icons
            const sunIcon = darkModeToggle.querySelector('.fa-sun');
            const moonIcon = darkModeToggle.querySelector('.fa-moon');
            
            if (isDark) {
                sunIcon.classList.add('hidden');
                moonIcon.classList.remove('hidden');
            } else {
                sunIcon.classList.remove('hidden');
                moonIcon.classList.add('hidden');
            }
        });
    }

    // Mobile toggle for dark mode
    if (darkToggleMobile) {
        darkToggleMobile.addEventListener('click', () => {
            html.classList.toggle('dark');
            
            const isDark = html.classList.contains('dark');
            localStorage.setItem('darkMode', isDark);
            
            // Toggle icons
            const sunIcon = darkToggleMobile.querySelector('.fa-sun');
            const moonIcon = darkToggleMobile.querySelector('.fa-moon');
            
            if (isDark) {
                sunIcon.classList.add('hidden');
                moonIcon.classList.remove('hidden');
            } else {
                sunIcon.classList.remove('hidden');
                moonIcon.classList.add('hidden');
            }
        });
    }
    
    // Add scrolled class to navbar for shadow effect
    const navbar = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Close mobile menu when clicking a link (toggle is handled globally in js/main.js)
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('#mobile-menu a');
    if (mobileMenu && menuToggle && mobileLinks.length) {
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                // reset icon to burger
                menuToggle.innerHTML = '<i class="fas fa-bars text-xl"></i>';
            });
        });
    }
    
    // Initialize AOS with consent awareness (SAFELY)
    function initializeAOS() {
        if (typeof AOS !== 'undefined' && AOS.init) {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: false
            });
            console.log('✅ AOS initialized in datenschutz-inline.js');
        } else {
            console.log('⏳ AOS not yet available, will retry when loaded');
        }
    }
    
    // Wait for ConsentManager to be available before checking functional consent
    function checkConsentAndInitAOS() {
        if (window.ConsentManager && window.ConsentManager.has('functional')) {
            initializeAOS();
        } else if (window.ConsentManager) {
            // Listen for consent changes
            window.ConsentManager.onChange(function(prefs) {
                if (prefs.functional) {
                    // Delay to allow AOS script to load
                    setTimeout(initializeAOS, 200);
                }
            });
        } else {
            console.log('⏳ ConsentManager not yet ready, retrying...');
            // Retry after a short delay
            setTimeout(checkConsentAndInitAOS, 100);
        }
    }
    
    // Listen for AOS script load events from consent manager
    document.addEventListener('consent-script-loaded', function(e) {
        if (e.detail.src && e.detail.src.includes('aos') && e.detail.success) {
            console.log('📦 AOS script loaded via consent manager');
            setTimeout(initializeAOS, 100);
        }
    });
    
    // Start the consent check process
    checkConsentAndInitAOS();
}); // END DOMContentLoaded
