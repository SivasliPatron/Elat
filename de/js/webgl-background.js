// 3D Hintergrundanimation mit Three.js
class WebGLBackground {
    constructor() {
        this.container = document.getElementById('webgl-container');
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.clock = new THREE.Clock();
        this.particles = [];
        this.mouse = new THREE.Vector2(0, 0);
        this.targetMouse = new THREE.Vector2(0, 0);
        this.raycaster = new THREE.Raycaster();
        this.init();
    }

    init() {
        // Setup renderer
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
        this.renderer.setClearColor(0x111827, 1);
        this.container.appendChild(this.renderer.domElement);

        // Setup camera position
        this.camera.position.z = 10;

        // Create an ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        // Create directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(0, 5, 5);
        this.scene.add(directionalLight);

        // Add Fluid-like 3D Objects
        this.createFluidObjects();

        // Add Mouse Move Event for interactive effect
        window.addEventListener('mousemove', this.onMouseMove.bind(this));

        // Handle Window Resize
        window.addEventListener('resize', this.onWindowResize.bind(this));

        // Start animation loop
        this.animate();
    }

    createFluidObjects() {
        // Material für die Flüssigkeitskugeln
        const material = new THREE.MeshPhysicalMaterial({
            color: 0x4f46e5,
            metalness: 0.2,
            roughness: 0.2,
            transmission: 0.95,
            thickness: 0.5,
            clearcoat: 1,
            clearcoatRoughness: 0.1,
        });

        // Ölpartikel erzeugen
        for (let i = 0; i < 12; i++) {
            const geometry = new THREE.SphereGeometry(
                Math.random() * 0.8 + 0.2,  // Größe zwischen 0.2 und 1.0
                32, 32
            );
            
            const mesh = new THREE.Mesh(geometry, material.clone());
            
            // Zufällige Position
            mesh.position.set(
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 10
            );
            
            // Zufällige Rotation
            mesh.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            
            // Individuelle Material-Anpassungen
            mesh.material.color.setHSL(Math.random() * 0.1 + 0.6, 0.8, 0.5);
            mesh.material.transmission = Math.random() * 0.5 + 0.45;
            
            // Bewegungsdynamik hinzufügen
            const dynamics = {
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.02,
                    (Math.random() - 0.5) * 0.02,
                    (Math.random() - 0.5) * 0.01
                ),
                rotation: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.01,
                    (Math.random() - 0.5) * 0.01,
                    (Math.random() - 0.5) * 0.01
                ),
                originalScale: Math.random() * 0.5 + 0.8,
                pulseSpeed: Math.random() * 0.002 + 0.001
            };
            
            // Speichere das Mesh und seine Dynamik
            this.particles.push({
                mesh,
                dynamics
            });
            
            this.scene.add(mesh);
        }

        // Kreiere ein zentrales großes Element
        const centerGeometry = new THREE.TorusKnotGeometry(2, 0.6, 100, 16);
        const centerMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x6366f1,
            metalness: 0.2,
            roughness: 0.1,
            transmission: 0.9,
            thickness: 0.5,
            clearcoat: 1,
            clearcoatRoughness: 0.1,
            emissive: 0x4338ca,
            emissiveIntensity: 0.2
        });

        this.centerMesh = new THREE.Mesh(centerGeometry, centerMaterial);
        this.centerMesh.position.z = -2;
        this.scene.add(this.centerMesh);
    }

    onMouseMove(event) {
        // Berechne normalisierte Mauskoordinaten (-1 bis 1)
        this.targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        const delta = this.clock.getDelta();
        const elapsedTime = this.clock.getElapsedTime();
        
        // Sanft zur Zielmausposition übergehen
        this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
        this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;
        
        // Kamera basierend auf Mausposition leicht bewegen
        this.camera.position.x += (this.mouse.x * 2 - this.camera.position.x) * 0.02;
        this.camera.position.y += (this.mouse.y * 2 - this.camera.position.y) * 0.02;
        this.camera.lookAt(this.scene.position);
        
        // Zentrales Torus-Element animieren
        if (this.centerMesh) {
            this.centerMesh.rotation.x = elapsedTime * 0.2;
            this.centerMesh.rotation.y = elapsedTime * 0.3;
            this.centerMesh.scale.x = 1 + Math.sin(elapsedTime * 0.5) * 0.1;
            this.centerMesh.scale.y = 1 + Math.sin(elapsedTime * 0.7) * 0.1;
            this.centerMesh.scale.z = 1 + Math.sin(elapsedTime * 0.6) * 0.1;
        }
        
        // Alle Partikel bewegen und animieren
        this.particles.forEach(particle => {
            const { mesh, dynamics } = particle;
            
            // Position aktualisieren
            mesh.position.add(dynamics.velocity);
            
            // Rotation aktualisieren
            mesh.rotation.x += dynamics.rotation.x;
            mesh.rotation.y += dynamics.rotation.y;
            mesh.rotation.z += dynamics.rotation.z;
            
            // Pulsieren mit Sinus-Welle
            const scale = dynamics.originalScale + Math.sin(elapsedTime * dynamics.pulseSpeed * 10) * 0.1;
            mesh.scale.set(scale, scale, scale);
            
            // Mausinteraktion
            const distanceToMouse = new THREE.Vector3(
                this.mouse.x * 10 - mesh.position.x,
                this.mouse.y * 10 - mesh.position.y,
                0
            ).length();
            
            if (distanceToMouse < 3) {
                // Bei Mausnähe leicht anziehen
                const strength = (3 - distanceToMouse) * 0.002;
                mesh.position.x += (this.mouse.x * 10 - mesh.position.x) * strength;
                mesh.position.y += (this.mouse.y * 10 - mesh.position.y) * strength;
                
                // Größe erhöhen bei Mausnähe
                mesh.scale.multiplyScalar(1 + strength * 2);
            }
            
            // Grenzen setzen und zurückprallen
            const bounds = 8;
            ['x', 'y', 'z'].forEach(axis => {
                if (Math.abs(mesh.position[axis]) > bounds) {
                    dynamics.velocity[axis] *= -1;
                }
            });
        });
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Starte die WebGL Animation, wenn das Dokument geladen ist
document.addEventListener('DOMContentLoaded', () => {
    const webglBackground = new WebGLBackground();
});
