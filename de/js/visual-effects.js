/* Erweiterter JavaScript für high-end visuelle Effekte */
document.addEventListener('DOMContentLoaded', function() {
    // Particles.js Initialisierung für den Hintergrund
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 1000
                    }
                },
                "color": {
                    "value": ["#3b82f6", "#6366f1", "#8b5cf6"]
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.3,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#3b82f6",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.6
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
    
    // Scroll-Progress-Bar
    const progressBar = document.createElement('div');
    progressBar.classList.add('scroll-progress');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        width: 0;
        background: linear-gradient(90deg, #3b82f6, #8b5cf6);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPos = window.scrollY;
        const scrollPercent = (scrollPos / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
    
    // Smooth Scrolling für Anker-Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Erweiterte Navbar-Effekte
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        // Hinzufügen der hover-Linie
        const hoverLine = document.createElement('span');
        hoverLine.classList.add('hover-line');
        hoverLine.style.cssText = `
            position: absolute;
            bottom: -2px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, #3b82f6, #6366f1);
            transition: width 0.3s ease;
        `;
        link.appendChild(hoverLine);
        
        // Hover-Effekt
        link.addEventListener('mouseenter', () => {
            hoverLine.style.width = '100%';
        });
        
        link.addEventListener('mouseleave', () => {
            hoverLine.style.width = '0';
        });
    });
    
    // Cursor Trail-Effekt
    const cursorTrailContainer = document.createElement('div');
    cursorTrailContainer.classList.add('cursor-trail-container');
    cursorTrailContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9998;
    `;
    document.body.appendChild(cursorTrailContainer);
    
    const trailCount = 10;
    const trailElements = [];
    
    // Cursor-Trail-Elemente erstellen
    for (let i = 0; i < trailCount; i++) {
        const trailElement = document.createElement('div');
        trailElement.classList.add('cursor-trail');
        trailElement.style.cssText = `
            position: absolute;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: linear-gradient(135deg, #3b82f6, #6366f1);
            opacity: ${0.7 - (i * 0.07)};
            transform: scale(${1 - (i * 0.09)});
            transition: transform 0.1s ease, opacity 0.1s ease;
            pointer-events: none;
            box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
        `;
        cursorTrailContainer.appendChild(trailElement);
        trailElements.push({
            element: trailElement,
            x: 0,
            y: 0
        });
    }
    
    // Mausposition verfolgen
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Erste Trail-Element sofort positionieren
        trailElements[0].x = mouseX;
        trailElements[0].y = mouseY;
    });
    
    // Animationsschleife für Cursor-Trail
    function animateTrail() {
        // Position jedes Trail-Elements aktualisieren
        for (let i = 0; i < trailElements.length; i++) {
            const trail = trailElements[i];
            
            if (i > 0) {
                // Folge dem vorherigen Element mit Verzögerung
                const prevTrail = trailElements[i - 1];
                trail.x += (prevTrail.x - trail.x) * 0.3;
                trail.y += (prevTrail.y - trail.y) * 0.3;
            }
            
            trail.element.style.transform = `translate(${trail.x - 4}px, ${trail.y - 4}px)`;
        }
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
});

// Lazy Load für die Bilder
document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
    
    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    if (lazyImage.dataset.srcset) {
                        lazyImage.srcset = lazyImage.dataset.srcset;
                    }
                    lazyImage.classList.remove("lazy");
                    lazyImage.classList.add("fade-in");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
        
        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fallback für Browser ohne IntersectionObserver
        let active = false;
        
        const lazyLoad = function() {
            if (active === false) {
                active = true;
                
                setTimeout(function() {
                    lazyImages.forEach(function(lazyImage) {
                        if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
                            lazyImage.src = lazyImage.dataset.src;
                            if (lazyImage.dataset.srcset) {
                                lazyImage.srcset = lazyImage.dataset.srcset;
                            }
                            lazyImage.classList.remove("lazy");
                            lazyImage.classList.add("fade-in");
                            
                            lazyImages = lazyImages.filter(function(image) {
                                return image !== lazyImage;
                            });
                            
                            if (lazyImages.length === 0) {
                                document.removeEventListener("scroll", lazyLoad);
                                window.removeEventListener("resize", lazyLoad);
                                window.removeEventListener("orientationchange", lazyLoad);
                            }
                        }
                    });
                    
                    active = false;
                }, 200);
            }
        };
        
        document.addEventListener("scroll", lazyLoad);
        window.addEventListener("resize", lazyLoad);
        window.addEventListener("orientationchange", lazyLoad);
    }
});
