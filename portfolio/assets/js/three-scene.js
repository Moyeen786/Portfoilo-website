/**
 * 3D WebGL Background Scene using Three.js
 * Interactive floating geometries, particle field, and mouse-reactive camera
 */

(function init3DScene() {
  const canvas = document.getElementById('webgl-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 30;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0x6366f1, 2.5, 50);
  pointLight1.position.set(15, 15, 15);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0x06b6d4, 2.5, 50);
  pointLight2.position.set(-15, -15, 10);
  scene.add(pointLight2);

  const pointLight3 = new THREE.PointLight(0xec4899, 1.8, 40);
  pointLight3.position.set(0, 20, -10);
  scene.add(pointLight3);

  // Group for floating objects
  const worldGroup = new THREE.Group();
  scene.add(worldGroup);

  // 1. Floating Icosahedron with Wireframe Glow
  const icoGeometry = new THREE.IcosahedronGeometry(7, 1);
  const icoMaterial = new THREE.MeshStandardMaterial({
    color: 0x6366f1,
    wireframe: true,
    roughness: 0.2,
    metalness: 0.8,
    transparent: true,
    opacity: 0.45
  });
  const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
  icosahedron.position.set(18, 2, -5);
  worldGroup.add(icosahedron);

  // Inner Core Sphere
  const coreGeo = new THREE.SphereGeometry(3.5, 16, 16);
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0x06b6d4,
    emissive: 0x06b6d4,
    emissiveIntensity: 0.4,
    wireframe: false,
    roughness: 0.1,
    metalness: 0.9,
    transparent: true,
    opacity: 0.3
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  icosahedron.add(coreMesh);

  // 2. Floating Torus Ring
  const torusGeo = new THREE.TorusGeometry(10, 0.4, 16, 60);
  const torusMat = new THREE.MeshStandardMaterial({
    color: 0xec4899,
    wireframe: true,
    transparent: true,
    opacity: 0.35
  });
  const torus = new THREE.Mesh(torusGeo, torusMat);
  torus.position.set(-18, -6, -8);
  torus.rotation.x = Math.PI / 4;
  worldGroup.add(torus);

  // 3. Floating Mini Octahedrons
  const miniGeo = new THREE.OctahedronGeometry(1.8, 0);
  const miniMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    wireframe: true,
    transparent: true,
    opacity: 0.5
  });
  const miniMeshes = [];
  const coords = [
    { x: -14, y: 12, z: -10 },
    { x: 12, y: -14, z: -8 },
    { x: 0, y: 16, z: -12 },
    { x: -8, y: -12, z: -5 },
    { x: 15, y: 14, z: -15 }
  ];

  coords.forEach((pos) => {
    const mesh = new THREE.Mesh(miniGeo, miniMat);
    mesh.position.set(pos.x, pos.y, pos.z);
    mesh.userData = {
      rotSpeedX: (Math.random() - 0.5) * 0.02,
      rotSpeedY: (Math.random() - 0.5) * 0.02,
      floatSpeed: 0.001 + Math.random() * 0.002,
      initialY: pos.y
    };
    worldGroup.add(mesh);
    miniMeshes.push(mesh);
  });

  // 4. Particle Field / Cyber Constellation
  const particleCount = 650;
  const particleGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const colorOptions = [
    new THREE.Color(0x6366f1),
    new THREE.Color(0x06b6d4),
    new THREE.Color(0xec4899),
    new THREE.Color(0xa855f7)
  ];

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 120;
    positions[i + 1] = (Math.random() - 0.5) * 120;
    positions[i + 2] = (Math.random() - 0.5) * 60 - 10;

    const chosenColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    colors[i] = chosenColor.r;
    colors[i + 1] = chosenColor.g;
    colors[i + 2] = chosenColor.b;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particleMat = new THREE.PointsMaterial({
    size: 0.5,
    vertexColors: true,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending
  });

  const particleField = new THREE.Points(particleGeo, particleMat);
  worldGroup.add(particleField);

  // Mouse Interactivity
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
  });

  // Scroll Interactivity
  let scrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  });

  // Resize Handling
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  // Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Smooth mouse follow
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    camera.position.x = targetX * 4;
    camera.position.y = targetY * 4;
    camera.lookAt(scene.position);

    // Rotate main icosahedron
    icosahedron.rotation.x = elapsedTime * 0.25;
    icosahedron.rotation.y = elapsedTime * 0.35;
    icosahedron.position.y = 2 + Math.sin(elapsedTime * 0.8) * 1.5;

    // Rotate torus
    torus.rotation.x = Math.PI / 4 + elapsedTime * 0.15;
    torus.rotation.y = elapsedTime * 0.2;
    torus.position.y = -6 + Math.cos(elapsedTime * 0.6) * 1.5;

    // Mini octahedrons float and rotate
    miniMeshes.forEach((mesh) => {
      mesh.rotation.x += mesh.userData.rotSpeedX;
      mesh.rotation.y += mesh.userData.rotSpeedY;
      mesh.position.y =
        mesh.userData.initialY + Math.sin(elapsedTime * 1.5 + mesh.position.x) * 0.8;
    });

    // Slow rotation of particles
    particleField.rotation.y = elapsedTime * 0.02;
    particleField.rotation.x = elapsedTime * 0.01;

    // Subtle scroll influence on world group
    worldGroup.rotation.y = scrollY * 0.0005;

    renderer.render(scene, camera);
  }

  animate();
})();
