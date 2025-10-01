// Dynamisches Scrolling & Parallax-Effekte
document.addEventListener('DOMContentLoaded', function() {
    // Initialisiere Parallax-Effekt für die Hintergrundelemente
    if (typeof Parallax !== 'undefined') {
        const scene = document.getElementById('parallax-background');
        if (scene) {
            const parallaxInstance = new Parallax(scene, {
                relativeInput: true,
                clipRelativeInput: true,
                hoverOnly: false
            });
        }
    }
    
    // Horizontaler Scroll-Effekt für die Produktkarten
    const horizontalScroll = document.getElementById('horizontal-scroll');
    const scrollButtons = document.querySelectorAll('.scroll-btn');
    
    if (horizontalScroll && scrollButtons.length > 0) {
        scrollButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Entferne die 'active' Klasse von allen Buttons
                scrollButtons.forEach(btn => btn.classList.remove('active'));
                // Füge die 'active' Klasse zum geklickten Button hinzu
                this.classList.add('active');
                
                // Hole den Index des zu scrollenden Elements
                const index = parseInt(this.getAttribute('data-index'));
                const sections = horizontalScroll.querySelectorAll('.scroll-section');
                
                // Scrolle horizontal zur ausgewählten Karte
                if (sections[index]) {
                    // Berechne die Scroll-Position basierend auf der Breite des Elements und seinem Index
                    const scrollLeft = sections[index].offsetLeft - horizontalScroll.offsetLeft;
                    
                    // Scrolle mit einer Animation
                    gsap.to(horizontalScroll, {
                        scrollLeft: scrollLeft,
                        duration: 0.8,
                        ease: "power2.out"
                    });
                }
            });
        });
        
        // Optional: Automatisches Scrollen durch die Karten
        let autoScrollInterval;
        let currentIndex = 0;
        
        function startAutoScroll() {
            autoScrollInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % scrollButtons.length;
                scrollButtons[currentIndex].click();
            }, 5000); // Alle 5 Sekunden
        }
        
        function stopAutoScroll() {
            clearInterval(autoScrollInterval);
        }
        
        // Starte Auto-Scroll
        startAutoScroll();
        
        // Stoppe Auto-Scroll bei Maus über dem Container
        horizontalScroll.addEventListener('mouseenter', stopAutoScroll);
        horizontalScroll.addEventListener('mouseleave', startAutoScroll);
    }
    
    // Scroll-getriggerte Animationen mit GSAP ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
        // Sticky Scroll für den Benefits-Bereich
        ScrollTrigger.create({
            trigger: "#benefits-section",
            start: "top top",
            end: "bottom bottom",
            pin: ".sticky-content",
            pinSpacing: false
        });
        
        // Parallax-Effekt für Benefit-Items
        gsap.utils.toArray('.benefit-item').forEach((item, i) => {
            ScrollTrigger.create({
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                onEnter: () => {
                    gsap.to(item, {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: "power2.out"
                    });
                },
                onLeaveBack: () => {
                    gsap.to(item, {
                        y: 50,
                        opacity: 0.5,
                        duration: 0.8,
                        ease: "power2.in"
                    });
                }
            });
            
            // Setze initiale Position
            gsap.set(item, {
                y: 50,
                opacity: 0.5
            });
        });
        
        // Progress-basierte Animation für das zentrale Element
        ScrollTrigger.create({
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
                // Nutze den Scroll-Fortschritt für visuelle Effekte (z.B. Farbe ändern)
                const progress = self.progress;
                document.documentElement.style.setProperty('--scroll-progress', progress);
            }
        });
    }
    
    // 3D-Karten-Tilt-Effekt
    const cards = document.querySelectorAll('.card-3d');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', handleCardMove);
        card.addEventListener('mouseleave', resetCard);
    });
    
    function handleCardMove(e) {
        const card = this;
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        // Berechnungsfaktor basierend auf der Kartengröße
        const rotateX = mouseY / (rect.height / 2) * -10;
        const rotateY = mouseX / (rect.width / 2) * 10;
        
        // Wende 3D-Rotation an
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        
        // Lichtreflektion-Effekt
        const glare = card.querySelector('.card-glare');
        if (glare) {
            const glareX = (mouseX / rect.width) * 200 + 50;
            const glareY = (mouseY / rect.height) * 200 + 50;
            glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 50%)`;
        }
    }
    
    function resetCard() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        
        // Reset Glare
        const glare = this.querySelector('.card-glare');
        if (glare) {
            glare.style.background = 'none';
        }
    }
    
    // Smooth Scrolling für Anker-Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (!target) return;
            
            window.scrollTo({
                top: target.offsetTop - 100, // Offset für die Navbar
                behavior: 'smooth'
            });
        });
    });
    
    // Animated Counter für Zahlen
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = parseInt(counter.getAttribute('data-duration') || 2000);
            let startTime = null;
            
            function animate(timestamp) {
                if (!startTime) startTime = timestamp;
                const runtime = timestamp - startTime;
                const progress = Math.min(runtime / duration, 1);
                
                const currentValue = Math.floor(progress * target);
                counter.textContent = currentValue.toLocaleString();
                
                if (runtime < duration) {
                    requestAnimationFrame(animate);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            }
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        requestAnimationFrame(animate);
                        observer.unobserve(counter);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        });
    }
    
    // Starte die Animationen, sobald das Dokument geladen ist
    animateCounters();
});
