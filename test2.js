

const scene = new THREE.Scene();

// Set up the camera
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 6;



// Set up the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);



// Load the Earth texture
const loader = new THREE.TextureLoader();
loader.load('https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg', texture => {
  const geometry = new THREE.SphereGeometry(2, 32, 32);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const earth = new THREE.Mesh(geometry, material);
  scene.add(earth);

  // Add pinpointed locations
  const locations = [
    { name: 'Netherlands', latitude: 52, longitude: 5 },
    { name: 'Belgium', latitude: 50, longitude: 4 },
    { name: 'Germany', latitude: 51, longitude: 10 },
    { name: 'Austria', latitude: 47, longitude: 14 },
    { name: 'Sweden', latitude: 60, longitude: 18 },
    { name: 'Finland', latitude: 61, longitude: 25 },
    { name: 'Norway', latitude: 61, longitude: 8 },
    { name: 'Denmark', latitude: 55, longitude: 10 },
    { name: 'Uk', latitude: 54, longitude: -3 }
  ];

  const pinMaterial = new THREE.MeshBasicMaterial({ color: 0xff0002 });
  const pinGeometry = new THREE.SphereGeometry(0.03, 16, 16);
  
  locations.forEach(loc => {
    const pin = new THREE.Mesh(pinGeometry, pinMaterial);
    pin.position.setFromSphericalCoords(2, THREE.MathUtils.degToRad(90 - loc.latitude), THREE.MathUtils.degToRad(loc.longitude));
    earth.add(pin);
  });

  // Render the scene
  function animate() {
    
    requestAnimationFrame(animate);
    earth.rotation.y += 0.009;
    earth.rotation.x += 0.009;
    renderer.render(scene, camera);
  }
  animate();
});