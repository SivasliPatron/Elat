/* =============================================================================
   Extracted Inline JavaScript from index.html
   Date: 2025-09-27
   Purpose: Inline script functionality moved to external file
============================================================================= */

// Dynamische Hero-Höhe: Macht die Sektion GROSS und imposant
        function setHeroHeight() {
            try {
                const header = document.querySelector('header');
                const hero = document.getElementById('heroSection');
                const vh = window.innerHeight;
                const vw = window.innerWidth;
                
                // Mache die Hero Section VIEL größer
                let heroH;
                
                if (vw <= 640) {
                    // Mobile: 95% des Viewports
                    heroH = vh * 0.95;
                } else if (vw <= 1024) {
                    // Tablet: 100% des Viewports 
                    heroH = vh;
                } else {
                    // Desktop: 105% für extra imposante Darstellung
                    heroH = vh * 1.05;
                }
                
                // Mindestens 90vh, maximal 120vh
                heroH = Math.max(vh * 0.9, Math.min(heroH, vh * 1.2));
                
                document.documentElement.style.setProperty('--hero-h', heroH + 'px');
            } catch (e) {
                // Fallback: Große Hero Section
                document.documentElement.style.setProperty('--hero-h', '100vh');
            }
        }

        window.addEventListener('load', setHeroHeight);
        window.addEventListener('resize', setHeroHeight);
        window.addEventListener('orientationchange', setHeroHeight);

        // Preloader Animation
        window.addEventListener('load', function() {
            setTimeout(() => {
                const preloader = document.getElementById('preloader');
                if (preloader) {
                    preloader.classList.replace('loading', 'loaded');
                }
            }, 1500);
            
            // Initialize AOS - once: true bedeutet Animationen laufen nur einmal
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                mirror: false
            });
        });
        
        // Scroll Progress Bar - Optimiert für mobile Performance
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            // Throttle scroll events für bessere Performance
            if (scrollTimeout) {
                return;
            }
            
            scrollTimeout = setTimeout(function() {
                const scrollProgress = document.getElementById('scroll-progress');
                if (scrollProgress) { // Prüfen, ob das Element existiert
                    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                    const scrollPercent = (scrollTop / scrollHeight) * 100;
                    
                    // Verwende requestAnimationFrame für smooth animations
                    requestAnimationFrame(function() {
                        scrollProgress.style.transform = `scaleX(${scrollPercent / 100})`;
                    });
                }
                scrollTimeout = null;
            }, 10); // 10ms throttle für bessere Performance
            
            // Header bleibt sticky - keine Überschreibungen
            // Scroll Progress Bar weiterhin funktional
        }, { passive: true }); // Passive listener für bessere Performance
        
        // Cursor Follower
        document.addEventListener('mousemove', function(e) {
            const cursor = document.getElementById('cursor-follower');
            
            if (cursor) { // Prüfen, ob das Element existiert
                setTimeout(function() {
                    cursor.style.opacity = '1';
                    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
                }, 100);
            }
        });
        
        document.addEventListener('mouseleave', function() {
            const cursor = document.getElementById('cursor-follower');
            if (cursor) { // Prüfen, ob das Element existiert
                cursor.style.opacity = '0';
            }
        });
        
        // FAQ Toggle Functionality
        document.addEventListener('DOMContentLoaded', function() {
            // FAQ Tab functionality
            const faqTabs = document.querySelectorAll('.faq-tab');
            const faqTabContents = document.querySelectorAll('.faq-tab-content');
            
            faqTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    const targetTab = this.getAttribute('data-tab');
                    
                    // Remove active class from all tabs and contents
                    faqTabs.forEach(t => t.classList.remove('active'));
                    faqTabContents.forEach(content => {
                        content.classList.remove('active');
                        content.classList.add('hidden');
                    });
                    
                    // Add active class to clicked tab and show corresponding content
                    this.classList.add('active');
                    const targetContent = document.getElementById(targetTab);
                    if (targetContent) {
                        targetContent.classList.add('active');
                        targetContent.classList.remove('hidden');
                    }
                });
            });
            
            // FAQ Question functionality
            const faqButtons = document.querySelectorAll('.faq-question');
            
            faqButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const faqId = this.getAttribute('data-faq');
                    const answer = document.getElementById(`answer-${faqId}`);
                    const icon = document.getElementById(`icon-${faqId}`);
                    
                    // Close all other FAQ items in the current tab
                    const currentTab = this.closest('.faq-tab-content');
                    const currentTabButtons = currentTab.querySelectorAll('.faq-question');
                    
                    currentTabButtons.forEach(otherButton => {
                        if (otherButton !== this) {
                            const otherId = otherButton.getAttribute('data-faq');
                            const otherAnswer = document.getElementById(`answer-${otherId}`);
                            const otherIcon = document.getElementById(`icon-${otherId}`);
                            
                            if (otherAnswer) {
                                otherAnswer.classList.add('hidden');
                            }
                            if (otherIcon) {
                                otherIcon.classList.remove('rotate-180');
                            }
                        }
                    });
                    
                    // Toggle current FAQ item
                    if (answer && icon) {
                        if (answer.classList.contains('hidden')) {
                            answer.classList.remove('hidden');
                            icon.classList.add('rotate-180');
                        } else {
                            answer.classList.add('hidden');
                            icon.classList.remove('rotate-180');
                        }
                    }
                });
            });
        });
        
        // Sound Toggle für das Hero-Video
        document.addEventListener('DOMContentLoaded', function() {
            console.log('DOM Content Loaded - Initializing sound toggle');
            
            // Warten Sie einen Moment, um sicherzustellen, dass alle Elemente geladen sind
            setTimeout(function() {
                const soundToggle = document.getElementById('soundToggle');
                const soundIcon = document.getElementById('soundIcon');
                const heroVideo = document.getElementById('heroVideo');
                
                console.log('Sound toggle elements:', { soundToggle, soundIcon, heroVideo });
                
                if (soundToggle && soundIcon && heroVideo) {
                    // Video startet stumm für bessere User Experience
                    heroVideo.muted = true;
                    heroVideo.volume = 0.7; // Standard-Lautstärke auf 70%
                    console.log('Video muted state:', heroVideo.muted);
                    
                    // Entfernen Sie alle vorherigen Event-Listener
                    soundToggle.replaceWith(soundToggle.cloneNode(true));
                    const newSoundToggle = document.getElementById('soundToggle');
                    const newSoundIcon = document.getElementById('soundIcon');
                    
                    newSoundToggle.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Sound toggle clicked');
                        
                        // Video-Sound umschalten
                        heroVideo.muted = !heroVideo.muted;
                        console.log('New muted state:', heroVideo.muted);
                        
                        // Icon je nach Sound-Status ändern
                        if (heroVideo.muted) {
                            newSoundIcon.classList.remove('fa-volume-up');
                            newSoundIcon.classList.add('fa-volume-mute');
                            console.log('Icon changed to mute');
                        } else {
                            newSoundIcon.classList.remove('fa-volume-mute');
                            newSoundIcon.classList.add('fa-volume-up');
                            console.log('Icon changed to volume up');
                            
                            // Stelle sicher, dass das Video spielt
                            if (heroVideo.paused) {
                                heroVideo.play().catch(e => console.log('Play failed:', e));
                            }
                        }
                    });
                    
                    console.log('Sound toggle initialized successfully');
                } else {
                    console.error('Sound toggle elements not found:', {
                        soundToggle: !!soundToggle,
                        soundIcon: !!soundIcon,
                        heroVideo: !!heroVideo
                    });
                }
            }, 500);
        });
