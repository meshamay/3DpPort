// Portfolio Data
const portfolioItems = [
    {
        id: 1,
        title: "Your 3D Project 1",
        description: "Add description of your 3D work here. Describe the modeling process, materials used, and inspiration.",
        tags: ["3D Model", "Design", "Art"],
        modelType: "cube",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop" // 3D render placeholder
    },
    {
        id: 2,
        title: "Your 3D Project 2",
        description: "Showcase your best 3D artwork. Talk about the techniques and software you used.",
        tags: ["3D Art", "Render", "Visual"],
        modelType: "sphere",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop" // 3D render placeholder
    },
    {
        id: 3,
        title: "Your 3D Project 3",
        description: "Display your creative 3D designs. Highlight unique features and artistic choices.",
        tags: ["3D Design", "Creative", "Modern"],
        modelType: "torus",
        image: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=600&h=400&fit=crop" // 3D render placeholder
    },
    {
        id: 4,
        title: "Your 3D Project 4",
        description: "Present your 3D modeling skills. Share the story behind your creation.",
        tags: ["3D Modeling", "Art", "Design"],
        modelType: "dodecahedron",
        image: "https://images.unsplash.com/photo-1635002320849-a704f0049a1e?w=600&h=400&fit=crop" // 3D render placeholder
    },
    {
        id: 5,
        title: "Your 3D Project 5",
        description: "Feature your stunning 3D renders. Explain your workflow and techniques.",
        tags: ["3D Render", "Digital Art", "Visual"],
        modelType: "cylinder",
        image: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=600&h=400&fit=crop" // 3D render placeholder
    },
    {
        id: 6,
        title: "Your 3D Project 6",
        description: "Showcase more of your 3D portfolio. Add details about your creative process.",
        tags: ["3D Art", "Portfolio", "Design"],
        modelType: "cone",
        image: "https://images.unsplash.com/photo-1620121478247-ec786b9be2fa?w=600&h=400&fit=crop" // 3D render placeholder
    }
];

// Three.js Scene Setup
let heroScene, heroCamera, heroRenderer, heroMesh;
let viewerScene, viewerCamera, viewerRenderer, viewerMesh, viewerControls;
let currentModel = null;
let animationId = null;
let isWireframe = false;
let isAnimating = true;

// Initialize Hero Scene
function initHeroScene() {
    const container = document.getElementById('hero-canvas');
    if (!container) return;

    // Scene
    heroScene = new THREE.Scene();
    heroScene.fog = new THREE.Fog(0x0f172a, 10, 50);

    // Camera
    heroCamera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    heroCamera.position.z = 5;

    // Renderer
    heroRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    heroRenderer.setSize(container.clientWidth, container.clientHeight);
    heroRenderer.setClearColor(0x0f172a, 0);
    container.appendChild(heroRenderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    heroScene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x6366f1, 2);
    pointLight1.position.set(5, 5, 5);
    heroScene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8b5cf6, 2);
    pointLight2.position.set(-5, -5, 5);
    heroScene.add(pointLight2);

    // Create Hero Object
    const geometry = new THREE.TorusKnotGeometry(1.5, 0.5, 100, 16);
    const material = new THREE.MeshStandardMaterial({
        color: 0x6366f1,
        metalness: 0.7,
        roughness: 0.2,
        emissive: 0x6366f1,
        emissiveIntensity: 0.2
    });
    heroMesh = new THREE.Mesh(geometry, material);
    heroScene.add(heroMesh);

    // Particles
    createParticles(heroScene);

    // Animation
    animateHero();

    // Resize Handler
    window.addEventListener('resize', onHeroResize);
}

// Create Particle System
function createParticles(scene) {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x6366f1,
        transparent: true,
        opacity: 0.6
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    return particlesMesh;
}

// Animate Hero Scene
function animateHero() {
    requestAnimationFrame(animateHero);

    if (heroMesh) {
        heroMesh.rotation.x += 0.005;
        heroMesh.rotation.y += 0.008;
    }

    heroRenderer.render(heroScene, heroCamera);
}

// Hero Resize Handler
function onHeroResize() {
    const container = document.getElementById('hero-canvas');
    if (!container) return;

    heroCamera.aspect = container.clientWidth / container.clientHeight;
    heroCamera.updateProjectionMatrix();
    heroRenderer.setSize(container.clientWidth, container.clientHeight);
}

// Initialize Viewer Scene
function initViewerScene() {
    const container = document.getElementById('viewer-canvas');
    if (!container) return;

    // Scene
    viewerScene = new THREE.Scene();
    viewerScene.background = new THREE.Color(0x1a1a2e);

    // Camera
    viewerCamera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    viewerCamera.position.z = 5;

    // Renderer
    viewerRenderer = new THREE.WebGLRenderer({ antialias: true });
    viewerRenderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(viewerRenderer.domElement);

    // Controls
    viewerControls = new THREE.OrbitControls(viewerCamera, viewerRenderer.domElement);
    viewerControls.enableDamping = true;
    viewerControls.dampingFactor = 0.05;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    viewerScene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    viewerScene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0x6366f1, 1);
    pointLight1.position.set(-5, 3, 5);
    viewerScene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8b5cf6, 1);
    pointLight2.position.set(5, -3, -5);
    viewerScene.add(pointLight2);

    // Grid Helper
    const gridHelper = new THREE.GridHelper(10, 10, 0x444444, 0x222222);
    viewerScene.add(gridHelper);

    animateViewer();
}

// Animate Viewer Scene
function animateViewer() {
    animationId = requestAnimationFrame(animateViewer);

    if (viewerControls) {
        viewerControls.update();
    }

    if (viewerMesh && isAnimating) {
        viewerMesh.rotation.y += 0.005;
    }

    viewerRenderer.render(viewerScene, viewerCamera);
}

// Load Model in Viewer
function loadModelInViewer(modelType) {
    // Remove existing mesh
    if (viewerMesh) {
        viewerScene.remove(viewerMesh);
    }

    let geometry;
    switch (modelType) {
        case 'cube':
            geometry = new THREE.BoxGeometry(2, 2, 2);
            break;
        case 'sphere':
            geometry = new THREE.SphereGeometry(1.5, 32, 32);
            break;
        case 'torus':
            geometry = new THREE.TorusKnotGeometry(1, 0.4, 100, 16);
            break;
        case 'dodecahedron':
            geometry = new THREE.DodecahedronGeometry(1.5);
            break;
        case 'cylinder':
            geometry = new THREE.CylinderGeometry(1, 1, 2, 32);
            break;
        case 'cone':
            geometry = new THREE.ConeGeometry(1, 2, 32);
            break;
        default:
            geometry = new THREE.BoxGeometry(2, 2, 2);
    }

    const material = new THREE.MeshStandardMaterial({
        color: 0x6366f1,
        metalness: 0.7,
        roughness: 0.3,
        emissive: 0x6366f1,
        emissiveIntensity: 0.1
    });

    viewerMesh = new THREE.Mesh(geometry, material);
    viewerScene.add(viewerMesh);
}

// Populate Gallery
function populateGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;

    portfolioItems.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <div class="gallery-item-image" style="background-image: url('${item.image}'); background-size: cover; background-position: center;">
                ${!item.image || item.image.includes('images/') ? '<div class="placeholder-icon">🎨</div>' : ''}
            </div>
            <div class="gallery-item-content">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <div class="gallery-item-tags">
                    ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        
        galleryItem.addEventListener('click', () => openViewer(item));
        galleryGrid.appendChild(galleryItem);
    });
}

// Open Viewer Modal
function openViewer(item) {
    const modal = document.getElementById('viewerModal');
    const modelTitle = document.getElementById('modelTitle');
    const modelDescription = document.getElementById('modelDescription');

    modal.style.display = 'block';
    modelTitle.textContent = item.title;
    modelDescription.textContent = item.description;

    currentModel = item;

    // Initialize viewer if not already done
    if (!viewerScene) {
        setTimeout(() => {
            initViewerScene();
            loadModelInViewer(item.modelType);
        }, 100);
    } else {
        loadModelInViewer(item.modelType);
    }
}

// Close Modal
function closeModal() {
    const modal = document.getElementById('viewerModal');
    modal.style.display = 'none';
    
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
}

// Reset View
function resetView() {
    if (viewerCamera) {
        viewerCamera.position.set(0, 0, 5);
        viewerControls.reset();
    }
}

// Toggle Wireframe
function toggleWireframe() {
    if (viewerMesh) {
        isWireframe = !isWireframe;
        viewerMesh.material.wireframe = isWireframe;
    }
}

// Toggle Animation
function toggleAnimation() {
    isAnimating = !isAnimating;
    const button = document.getElementById('toggleAnimation');
    button.textContent = isAnimating ? 'Pause Animation' : 'Play Animation';
}

// Smooth Scroll
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Contact Form Handler
function handleContactForm(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const formStatus = document.getElementById('formStatus');
    const submitButton = e.target.querySelector('.submit-button');
    
    // Disable submit button
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    // Create mailto link with pre-filled information
    const ownerEmail = 'meshamay@example.com';
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(
        `Name: ${name}\n` +
        `Email: ${email}\n\n` +
        `Message:\n${message}\n\n` +
        `---\n` +
        `Sent via 3D Portfolio Contact Form`
    );
    
    const mailtoLink = `mailto:${ownerEmail}?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    formStatus.textContent = 'Opening your email client... Please send the email to complete your message.';
    formStatus.className = 'form-status success';
    
    // Reset form after a delay
    setTimeout(() => {
        e.target.reset();
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
        formStatus.textContent = 'Thank you for reaching out! Please check your email client.';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }, 2000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize hero scene
    initHeroScene();

    // Populate gallery
    populateGallery();

    // Modal close button
    const closeBtn = document.querySelector('.close-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('viewerModal');
        if (e.target === modal) {
            closeModal();
        }
    });

    // Viewer controls
    const resetBtn = document.getElementById('resetView');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetView);
    }

    const wireframeBtn = document.getElementById('toggleWireframe');
    if (wireframeBtn) {
        wireframeBtn.addEventListener('click', toggleWireframe);
    }

    const animationBtn = document.getElementById('toggleAnimation');
    if (animationBtn) {
        animationBtn.addEventListener('click', toggleAnimation);
    }

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
        });
    });

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Scroll reveal animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.gallery-item, .about-text, .contact-form').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('viewerModal');
    if (modal.style.display === 'block') {
        switch(e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'r':
            case 'R':
                resetView();
                break;
            case 'w':
            case 'W':
                toggleWireframe();
                break;
            case ' ':
                e.preventDefault();
                toggleAnimation();
                break;
        }
    }
});
