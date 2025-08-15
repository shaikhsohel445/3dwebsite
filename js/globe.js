// 3D Globe Implementation
const THREE = window.THREE // Declare the THREE variable
let scene, camera, renderer, globe, animationId

function initGlobe() {
  const container = document.getElementById("globe-container")
  if (!container) return

  // Scene setup
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000)
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.setClearColor(0x000000, 0)
  container.appendChild(renderer.domElement)

  // Create globe
  createGlobe()

  // Add lights
  const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(1, 1, 1)
  scene.add(directionalLight)

  // Position camera
  camera.position.z = 3

  // Start animation
  animate()

  // Handle resize
  window.addEventListener("resize", onWindowResize)
}

function createGlobe() {
  // Globe geometry
  const geometry = new THREE.SphereGeometry(1, 64, 64)

  // Create earth texture (using a simple gradient for demo)
  const canvas = document.createElement("canvas")
  canvas.width = 512
  canvas.height = 256
  const ctx = canvas.getContext("2d")

  // Create a simple earth-like texture
  const gradient = ctx.createLinearGradient(0, 0, 0, 256)
  gradient.addColorStop(0, "#4a90e2")
  gradient.addColorStop(0.3, "#7cb342")
  gradient.addColorStop(0.7, "#8bc34a")
  gradient.addColorStop(1, "#4a90e2")

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 512, 256)

  // Add some landmass-like shapes
  ctx.fillStyle = "#2e7d32"
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * 512
    const y = Math.random() * 256
    const radius = Math.random() * 30 + 10
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }

  const texture = new THREE.CanvasTexture(canvas)

  // Globe material
  const material = new THREE.MeshPhongMaterial({
    map: texture,
    transparent: true,
    opacity: 0.9,
  })

  globe = new THREE.Mesh(geometry, material)
  scene.add(globe)

  // Add trade route points
  addTradePoints()
  addTradeRoutes()
}

function addTradePoints() {
  const points = [
    { lat: 28.6139, lng: 77.209, name: "India" }, // Delhi
    { lat: 21.0285, lng: 105.8542, name: "Vietnam" }, // Hanoi
    { lat: 19.4326, lng: -99.1332, name: "Mexico" }, // Mexico City
    { lat: -36.8485, lng: 174.7633, name: "New Zealand" }, // Auckland
    { lat: 4.711, lng: -74.0721, name: "Colombia" }, // Bogota
    { lat: 39.9334, lng: 32.8597, name: "Turkey" }, // Ankara
  ]

  points.forEach((point) => {
    const pointGeometry = new THREE.SphereGeometry(0.02, 8, 8)
    const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xff6b35 })
    const pointMesh = new THREE.Mesh(pointGeometry, pointMaterial)

    // Convert lat/lng to 3D coordinates
    const phi = (90 - point.lat) * (Math.PI / 180)
    const theta = (point.lng + 180) * (Math.PI / 180)

    pointMesh.position.x = -1.02 * Math.sin(phi) * Math.cos(theta)
    pointMesh.position.y = 1.02 * Math.cos(phi)
    pointMesh.position.z = 1.02 * Math.sin(phi) * Math.sin(theta)

    scene.add(pointMesh)

    // Add pulsing animation
    const scale = { x: 1, y: 1, z: 1 }
    const animate = () => {
      scale.x = scale.y = scale.z = 1 + 0.3 * Math.sin(Date.now() * 0.005)
      pointMesh.scale.set(scale.x, scale.y, scale.z)
      requestAnimationFrame(animate)
    }
    animate()
  })
}

function addTradeRoutes() {
  // Create curved lines between trade points (simplified)
  const routes = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 4],
    [4, 5],
    [5, 0],
  ]

  routes.forEach((route) => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5),
      new THREE.Vector3(0, 1.5, 0),
      new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5),
    )

    const points = curve.getPoints(50)
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.6,
    })

    const line = new THREE.Line(geometry, material)
    scene.add(line)
  })
}

function animate() {
  animationId = requestAnimationFrame(animate)

  if (globe) {
    globe.rotation.y += 0.005
  }

  renderer.render(scene, camera)
}

function onWindowResize() {
  const container = document.getElementById("globe-container")
  if (!container) return

  camera.aspect = container.clientWidth / container.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(container.clientWidth, container.clientHeight)
}

// Initialize globe when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Small delay to ensure container is ready
  setTimeout(initGlobe, 100)
})

// Cleanup on page unload
window.addEventListener("beforeunload", () => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
