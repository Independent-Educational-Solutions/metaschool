import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';

const scene = new THREE.Scene()
const camera = new THREE.
  PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000,
  )

const renderer = new THREE.WebGLRenderer(
  )
console.log(scene)
console.log(camera)
console.log(renderer)

renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio)
document.body.appendChild(renderer.domElement)

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix()
})
const sphereGeometry = new THREE.SphereGeometry(2, 50, 50)
const material = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('../map/earth.jpg')})
const planeGeometry = new THREE.PlaneGeometry(20, 10, 50, 7)
const planeMaterial = new THREE.MeshPhongMaterial({ color: 0x39ff14, side: THREE.DoubleSide, flatShading: THREE.FlatShading})

const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
scene.add(planeMesh)

console.log(planeMesh.geometry.attributes.position.array)
const { array } = planeMesh.geometry.attributes.position
for (let i = 0;  i < array.length; i++) 
{
  const x = array[i];
  const y = array [ i + 1];
  const z = array [i + 2];

  array [i + 2] = z + Math.random()
}

const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(0, 0, 2)
scene.add(light)
const mesh = new THREE.Mesh(sphereGeometry, material)
scene.add(planeMesh)
console.log(mesh)

scene.add(mesh)

camera.position.z = 6

function animate () {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  mesh.rotation.x += 0.01
  mesh.rotation.y += 0.01
  //planeMesh.rotation.x += 0.01
}

animate()


