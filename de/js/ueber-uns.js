document.addEventListener('DOMContentLoaded', function() {
    // AOS initialisieren
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    
    // Werte-Karten Animation
    const valueCards = document.querySelectorAll('.value-card');
    
    // Verzögertes Einblenden der Karten
    valueCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('opacity-100');
        }, index * 150);
    });
    
    // Parallax-Effekt für Hero-Sektion
    const heroSection = document.querySelector('.relative.overflow-hidden.bg-gradient-to-r');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const oilDrops = document.querySelectorAll('.oil-drop');
            
            oilDrops.forEach((drop, index) => {
                const speed = 0.05 + (index * 0.02);
                const yPos = scrollPosition * speed;
                drop.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
    
    // Video Thumbnail Klick-Event
    const videoThumbnail = document.querySelector('.group.relative.cursor-pointer');
    if (videoThumbnail) {
        videoThumbnail.addEventListener('click', function() {
            // Hier könnte ein Modal mit einem Video geöffnet werden
            alert("Video wird gestartet! (Dummy-Funktion)");
        });
    }
    
    // 3D Tilt-Effekt für Wertekarten
    valueCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // X-Position innerhalb des Elements
            const y = e.clientY - rect.top;  // Y-Position innerhalb des Elements
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / 20;
            const moveY = (y - centerY) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${-moveY}deg) rotateY(${moveX}deg) translateZ(10px) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Animierte Zahlen für Statistiken
    const statNumbers = document.querySelectorAll('.text-3xl.md\\:text-4xl.font-bold');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }, 300);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        stat.style.opacity = "0";
        stat.style.transform = "translateY(20px)";
        observer.observe(stat);
    });
    
    // Timeline Animation
    const timelineItems = document.querySelectorAll('.border-l-4.border-blue-600 .relative');
    timelineItems.forEach((item, index) => {
        item.style.opacity = "0";
        item.style.transform = "translateX(-20px)";
        
        setTimeout(() => {
            item.style.transition = "all 0.6s ease";
            item.style.opacity = "1";
            item.style.transform = "translateX(0)";
        }, 800 + (index * 300));
    });
});
