/* =============================================================================
   Extracted Inline JavaScript from impressum.html
   Date: 2025-09-27
   Purpose: Inline script functionality moved to external file
============================================================================= */

document.addEventListener('DOMContentLoaded', () => {
            // Initialize AOS animations
            if (typeof AOS !== 'undefined') {
                AOS.init({
                    duration: 800,
                    easing: 'ease-in-out',
                    once: true,
                    offset: 100,
                    disable: window.innerWidth < 768 ? true : false // Disable on mobile devices
                });
            } else {
                console.warn("AOS library not loaded");
            }
            
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
            
            // Scroll to Top Button wurde entfernt
            
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
            
            // Initialize AOS
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: false
            });
        });
