/* =============================================================================
   Extracted Inline JavaScript from produkte.html
   Date: 2025-09-27
   Purpose: Inline script functionality moved to external file
============================================================================= */

document.addEventListener('DOMContentLoaded', function() {
            // Mobile Filter Toggle
            const mobileFilterToggle = document.getElementById('mobile-filter-toggle');
            const filterContent = document.getElementById('filter-content');
            
            if (mobileFilterToggle && filterContent) {
                // Referenzen für Label und Icon und Standardtext setzen
                const labelSpan = mobileFilterToggle.querySelector('span');
                const iconEl = mobileFilterToggle.querySelector('i');
                if (labelSpan) {
                    labelSpan.textContent = 'Filter anzeigen/ausblenden';
                }
                // Beim Laden prüfen, ob wir auf einem Desktop-Gerät sind
                if (window.innerWidth >= 1024) { // 1024px ist der lg-Breakpoint in Tailwind
                    filterContent.classList.remove('hidden');
                }
                
                mobileFilterToggle.addEventListener('click', function() {
                    filterContent.classList.toggle('hidden');
                    
                    // Aktualisiere den Button-Text und Icon
                    const isVisible = !filterContent.classList.contains('hidden');
                    if (isVisible) {
                        // Label bleibt gleich, nur Icon und Farben wechseln
                        if (iconEl) {
                            iconEl.classList.remove('fa-filter');
                            iconEl.classList.add('fa-times');
                        }
                        mobileFilterToggle.classList.add('bg-gray-700');
                        mobileFilterToggle.classList.remove('bg-blue-600');
                    } else {
                        if (iconEl) {
                            iconEl.classList.remove('fa-times');
                            iconEl.classList.add('fa-filter');
                        }
                        mobileFilterToggle.classList.remove('bg-gray-700');
                        mobileFilterToggle.classList.add('bg-blue-600');
                    }
                    
                    // Scrolle nach oben, wenn Filter angezeigt werden
                    if (isVisible) {
                        const filterTop = mobileFilterToggle.getBoundingClientRect().top + window.pageYOffset;
                        window.scrollTo({
                            top: filterTop - 100,
                            behavior: 'smooth'
                        });
                    }
                });
                
                // Stelle sicher, dass Filter auf großen Bildschirmen immer sichtbar sind
                window.addEventListener('resize', function() {
                    if (window.innerWidth >= 1024) {
                        filterContent.classList.remove('hidden');
                        // Reset: Label bleibt gleich, Icon zurück auf Filter
                        if (labelSpan) labelSpan.textContent = 'Filter anzeigen/ausblenden';
                        if (iconEl) {
                            iconEl.classList.remove('fa-times');
                            iconEl.classList.add('fa-filter');
                        }
                        mobileFilterToggle.classList.remove('bg-gray-700');
                        mobileFilterToggle.classList.add('bg-blue-600');
                    } else if (!mobileFilterToggle.classList.contains('active')) {
                        filterContent.classList.add('hidden');
                    }
                });
            }
            
            // Initialize AOS
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: false
            });
        });
