// 3D Produktvisualisierung mit Three.js
class ProductVisualizer {
    constructor() {
        this.container = document.getElementById('product-visualizer');
        if (!this.container) return;
        
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true
        });
        
        this.controls = null;
        this.product = null;
        this.materials = [];
        this.lights = [];
        this.isRotating = true;
        this.rotationSpeed = 0.005;
        this.highlightMaterial = new THREE.MeshPhongMaterial({
            color: 0x3b82f6,
            emissive: 0x3b82f6,
            emissiveIntensity: 0.2,
            transparent: true,
            opacity: 0
        });
        
        this.init();
    }
    
    init() {
        // Setup renderer
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.container.appendChild(this.renderer.domElement);
        
        // Setup camera
        this.camera.position.set(0, 0, 10);
        
        // Add OrbitControls für interaktive Kontrolle
        if (typeof THREE.OrbitControls !== 'undefined') {
            this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
            this.controls.enableDamping = true;
            this.controls.dampingFactor = 0.05;
            this.controls.enableZoom = true;
            this.controls.enablePan = false;
            this.controls.maxPolarAngle = Math.PI / 1.5;
            this.controls.minPolarAngle = Math.PI / 4;
        }
        
        // Lighting Setup
        this.setupLighting();
        
        // Lade das 3D-Modell (oder erstelle ein Placeholder-Modell)
        this.createOilBottle();
        
        // Interaktionselemente verknüpfen
        this.bindInteractionElements();
        
        // Handle Window Resize
        window.addEventListener('resize', () => this.onWindowResize());
        
        // Start animation loop
        this.animate();
    }
    
    setupLighting() {
        // Ambient Light für grundlegende Beleuchtung
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);
        
        // Directional Light als Hauptlichtquelle
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 10, 7.5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;
        
        // Spotlight für fokussierte Beleuchtung
        const spotLight = new THREE.SpotLight(0xffffff, 1);
        spotLight.position.set(-5, 10, 2);
        spotLight.angle = Math.PI / 6;
        spotLight.penumbra = 0.2;
        spotLight.castShadow = true;
        
        this.scene.add(directionalLight, spotLight);
        this.lights.push(directionalLight, spotLight);
    }
    
    createOilBottle() {
        // Erstelle eine stilisierte Ölflasche
        const bottleGroup = new THREE.Group();
        
        // Flaschenkörper
        const bodyGeometry = new THREE.CylinderGeometry(1, 1, 3, 32);
        // Runde den oberen Teil ab
        const neckGeometry = new THREE.CylinderGeometry(0.4, 1, 0.5, 32);
        // Flaschenhals
        const topGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.7, 32);
        // Deckel
        const capGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.3, 32);
        
        // Material für die Flasche - Transparentes Blau
        const bottleMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x3b82f6,
            metalness: 0.2,
            roughness: 0.1,
            transmission: 0.9,
            thickness: 0.5,
            transparent: true,
            opacity: 0.8
        });
        
        // Material für den Deckel
        const capMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x111827,
            metalness: 0.8,
            roughness: 0.2
        });
        
        // Erstelle Mesh-Objekte
        const body = new THREE.Mesh(bodyGeometry, bottleMaterial);
        const neck = new THREE.Mesh(neckGeometry, bottleMaterial);
        const top = new THREE.Mesh(topGeometry, bottleMaterial);
        const cap = new THREE.Mesh(capGeometry, capMaterial);
        
        // Positioniere die Teile
        body.position.y = 0;
        neck.position.y = 1.75;
        top.position.y = 2.35;
        cap.position.y = 2.85;
        
        // Füge die Teile zur Gruppe hinzu
        bottleGroup.add(body, neck, top, cap);
        
        // Erstelle einen "Inhalt" für die Flasche (Öl)
        const oilGeometry = new THREE.CylinderGeometry(0.9, 0.9, 2.8, 32);
        const oilMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xeab308, // Goldgelbes Öl
            metalness: 0.1,
            roughness: 0.2,
            transmission: 0.8,
            thickness: 2
        });
        
        const oil = new THREE.Mesh(oilGeometry, oilMaterial);
        oil.position.y = -0.1;
        bottleGroup.add(oil);
        
        // Füge ein Etikett hinzu (als einfache Geometrie)
        const labelGeometry = new THREE.PlaneGeometry(2, 1.5);
        
        // Erstelle eine dynamische Textur für das Label
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 384;
        const context = canvas.getContext('2d');
        
        // Hintergrund
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        // Logo
        context.fillStyle = '#0055cc';
        context.font = 'bold 80px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText('ELAT', canvas.width / 2, canvas.height / 3);
        
        // Produktname
        context.fillStyle = '#111827';
        context.font = 'bold 60px Arial';
        context.fillText('Premium 5W-30', canvas.width / 2, canvas.height / 2 + 30);
        
        // Zusatzinfos
        context.font = '30px Arial';
        context.fillStyle = '#4b5563';
        context.fillText('Vollsynthetisches Motoröl', canvas.width / 2, canvas.height / 2 + 90);
        
        // Erstelle eine Three.js Textur aus dem Canvas
        const texture = new THREE.CanvasTexture(canvas);
        
        const labelMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 1
        });
        
        const label = new THREE.Mesh(labelGeometry, labelMaterial);
        label.position.z = 1.01; // Leicht vor der Flasche
        label.rotation.y = Math.PI;
        bottleGroup.add(label);
        
        // Speichere die Materialien für spätere Anpassungen
        this.materials = [bottleMaterial, capMaterial, oilMaterial, labelMaterial];
        
        // Füge die Flaschengruppe zur Szene hinzu
        this.scene.add(bottleGroup);
        this.product = bottleGroup;
        
        // Zentrale Position mit leichter Rotation
        this.product.rotation.y = Math.PI / 6;
        
        // Erstelle Highlight-Punkte für interaktive Informationen
        this.createHighlightPoints();
    }
    
    createHighlightPoints() {
        // Erstelle Highlight-Punkte an interessanten Stellen des Produkts
        const createHighlight = (position, text, detail) => {
            const highlightGroup = new THREE.Group();
            
            // Äußerer Ring
            const ringGeometry = new THREE.RingGeometry(0.15, 0.2, 32);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.8
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            
            // Innerer Punkt
            const pointGeometry = new THREE.CircleGeometry(0.08, 32);
            const pointMaterial = new THREE.MeshBasicMaterial({
                color: 0x3b82f6,
                side: THREE.DoubleSide
            });
            const point = new THREE.Mesh(pointGeometry, pointMaterial);
            point.position.z = 0.01;
            
            highlightGroup.add(ring, point);
            highlightGroup.position.copy(position);
            highlightGroup.userData = {
                title: text,
                detail: detail,
                originalScale: highlightGroup.scale.clone(),
                hover: false
            };
            
            // Mache den Punkt zur Interaktion fähig
            const raycaster = new THREE.Raycaster();
            const mouse = new THREE.Vector2();
            
            // Füge Event-Listener hinzu
            this.renderer.domElement.addEventListener('mousemove', (event) => {
                const rect = this.renderer.domElement.getBoundingClientRect();
                mouse.x = ((event.clientX - rect.left) / this.renderer.domElement.clientWidth) * 2 - 1;
                mouse.y = -((event.clientY - rect.top) / this.renderer.domElement.clientHeight) * 2 + 1;
                
                raycaster.setFromCamera(mouse, this.camera);
                const intersects = raycaster.intersectObject(ring);
                
                if (intersects.length > 0) {
                    if (!highlightGroup.userData.hover) {
                        highlightGroup.userData.hover = true;
                        gsap.to(highlightGroup.scale, {
                            x: 1.3,
                            y: 1.3,
                            z: 1.3,
                            duration: 0.3,
                            ease: "back.out"
                        });
                        
                        // Zeige Info-Panel an
                        this.showInfoPanel(highlightGroup.userData.title, highlightGroup.userData.detail);
                    }
                } else if (highlightGroup.userData.hover) {
                    highlightGroup.userData.hover = false;
                    gsap.to(highlightGroup.scale, {
                        x: highlightGroup.userData.originalScale.x,
                        y: highlightGroup.userData.originalScale.y,
                        z: highlightGroup.userData.originalScale.z,
                        duration: 0.3
                    });
                    
                    // Verberge Info-Panel
                    this.hideInfoPanel();
                }
            });
            
            this.scene.add(highlightGroup);
        };
        
        // Erstelle Highlight-Punkte an verschiedenen Stellen
        createHighlight(
            new THREE.Vector3(1.1, 1.0, 0.5),
            "Vollsynthetische Basis",
            "Hochwertige synthetische Grundöle für hervorragende Schmiereigenschaften und Ölwechselintervalle bis zu 30.000 km."
        );
        
        createHighlight(
            new THREE.Vector3(-0.2, 2.5, 0.9),
            "Hochwertiger Verschlussmechanismus",
            "Präzise gefertigter Verschluss für einfaches Öffnen und sicheres Verschließen ohne Auslaufen."
        );
        
        createHighlight(
            new THREE.Vector3(-1.1, 0.5, 0.3),
            "Spezielle Additive",
            "Fortschrittliche Additivpakete schützen vor Verschleiß, Korrosion und Ablagerungen selbst unter extremen Bedingungen."
        );
    }
    
    showInfoPanel(title, detail) {
        if (!this.infoPanel) {
            this.infoPanel = document.createElement('div');
            this.infoPanel.className = 'product-info-panel glassmorphism-dark p-4 rounded-lg shadow-xl border border-white/10 text-white absolute pointer-events-none transition-all duration-300 opacity-0 transform translate-y-2';
            this.infoPanel.style.maxWidth = '300px';
            this.infoPanel.style.zIndex = '100';
            document.body.appendChild(this.infoPanel);
        }
        
        this.infoPanel.innerHTML = `
            <h4 class="text-lg font-semibold mb-2">${title}</h4>
            <p class="text-sm text-white/80">${detail}</p>
        `;
        
        // Position des Info-Panels an die Mausposition anpassen
        document.addEventListener('mousemove', this.updateInfoPanelPosition.bind(this));
        
        // Zeige Panel mit Animation an
        gsap.to(this.infoPanel, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
        });
    }
    
    updateInfoPanelPosition(e) {
        if (this.infoPanel) {
            const x = e.clientX + 15;
            const y = e.clientY + 15;
            
            // Verhindere, dass das Panel außerhalb des Bildschirms erscheint
            const panelRect = this.infoPanel.getBoundingClientRect();
            const maxX = window.innerWidth - panelRect.width - 20;
            const maxY = window.innerHeight - panelRect.height - 20;
            
            this.infoPanel.style.left = `${Math.min(x, maxX)}px`;
            this.infoPanel.style.top = `${Math.min(y, maxY)}px`;
        }
    }
    
    hideInfoPanel() {
        if (this.infoPanel) {
            gsap.to(this.infoPanel, {
                opacity: 0,
                y: 10,
                duration: 0.2,
                onComplete: () => {
                    document.removeEventListener('mousemove', this.updateInfoPanelPosition.bind(this));
                }
            });
        }
    }
    
    bindInteractionElements() {
        // Rotation Toggle
        const rotationToggle = document.getElementById('rotation-toggle');
        if (rotationToggle) {
            rotationToggle.addEventListener('click', () => {
                this.isRotating = !this.isRotating;
                rotationToggle.classList.toggle('active');
            });
        }
        
        // Farbe wechseln
        const colorButtons = document.querySelectorAll('.color-option');
        colorButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const color = e.target.dataset.color;
                this.changeProductColor(color);
                
                // Update UI
                colorButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
        
        // Zoom Controls
        const zoomIn = document.getElementById('zoom-in');
        const zoomOut = document.getElementById('zoom-out');
        if (zoomIn && zoomOut && this.controls) {
            zoomIn.addEventListener('click', () => {
                this.controls.dollyIn(1.2);
            });
            
            zoomOut.addEventListener('click', () => {
                this.controls.dollyOut(1.2);
            });
        }
        
        // Reset View
        const resetView = document.getElementById('reset-view');
        if (resetView) {
            resetView.addEventListener('click', () => {
                this.resetView();
            });
        }
    }
    
    changeProductColor(colorHex) {
        if (!this.materials[0]) return;
        
        // Konvertiere HEX zu RGB
        const color = new THREE.Color(colorHex);
        
        // Ändere die Farbe des Öls
        this.materials[2].color = color;
    }
    
    resetView() {
        if (!this.controls) return;
        
        // Reset Camera Position
        gsap.to(this.camera.position, {
            x: 0,
            y: 0,
            z: 10,
            duration: 1.5,
            ease: "power2.inOut"
        });
        
        // Reset Product Rotation
        gsap.to(this.product.rotation, {
            x: 0,
            y: Math.PI / 6,
            z: 0,
            duration: 1.5,
            ease: "power2.inOut"
        });
        
        // Reset Controls Target
        gsap.to(this.controls.target, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate: () => {
                this.controls.update();
            }
        });
    }
    
    onWindowResize() {
        if (!this.container) return;
        
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }
    
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        // Automatische Rotation des Produkts
        if (this.product && this.isRotating) {
            this.product.rotation.y += this.rotationSpeed;
        }
        
        // Update Controls
        if (this.controls) {
            this.controls.update();
        }
        
        // Render Scene
        this.renderer.render(this.scene, this.camera);
    }
}

// Starte die 3D-Produktvisualisierung, wenn das Dokument geladen ist
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const productVisualizer = new ProductVisualizer();
    }, 1500); // Warte auf Preloader
});
