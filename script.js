// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Hero 3D Scene
const heroCanvas = document.getElementById('hero-canvas');
const heroScene = new THREE.Scene();
const heroCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const heroRenderer = new THREE.WebGLRenderer({ canvas: heroCanvas, alpha: true });
heroRenderer.setSize(window.innerWidth, window.innerHeight);
heroCamera.position.z = 5;

// Create animated torus
const torusGeometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
const torusMaterial = new THREE.MeshBasicMaterial({ 
    color: 0x915eff,
    wireframe: true 
});
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.x = 3;
heroScene.add(torus);

// Stars
const starsGeometry = new THREE.BufferGeometry();
const starVertices = [];
for (let i = 0; i < 500; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;
    starVertices.push(x, y, z);
}
starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 2 });
const stars = new THREE.Points(starsGeometry, starsMaterial);
heroScene.add(stars);

function animateHero() {
    requestAnimationFrame(animateHero);
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;
    stars.rotation.y += 0.0002;
    heroRenderer.render(heroScene, heroCamera);
}
animateHero();

// Earth Canvas for Contact Section
const earthCanvas = document.getElementById('earth-canvas');
const earthScene = new THREE.Scene();
const earthCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const earthRenderer = new THREE.WebGLRenderer({ canvas: earthCanvas, alpha: true });
earthRenderer.setSize(window.innerWidth, window.innerHeight * 0.8);
earthCamera.position.z = 5;

// Create Earth-like sphere
const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({ 
    color: 0x00cea8,
    wireframe: true 
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
earthScene.add(sphere);

function animateEarth() {
    requestAnimationFrame(animateEarth);
    sphere.rotation.y += 0.003;
    earthRenderer.render(earthScene, earthCamera);
}
animateEarth();

// Handle window resize
window.addEventListener('resize', () => {
    heroCamera.aspect = window.innerWidth / window.innerHeight;
    heroCamera.updateProjectionMatrix();
    heroRenderer.setSize(window.innerWidth, window.innerHeight);

    earthCamera.aspect = window.innerWidth / window.innerHeight;
    earthCamera.updateProjectionMatrix();
    earthRenderer.setSize(window.innerWidth, window.innerHeight * 0.8);
});

// Smooth scroll animation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});