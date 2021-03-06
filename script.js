const textureLoader = new THREE.TextureLoader()

const normalTextureEarth = textureLoader.load('./earth.jpeg')
const normalTextureSUN = textureLoader.load('./sun.jpeg')
const normalTextureJupiter = textureLoader.load('./jupiter.jpeg')
const normalTextureSaturn = textureLoader.load('./saturn.jpeg')
const normalTextureMercury = textureLoader.load('./mercury.jpeg')
const normalTextureMars = textureLoader.load('./mars.jpeg')
const normalTextureVenus = textureLoader.load('./venus.jpeg')
const normalTextureNeptune = textureLoader.load('./neptune.jpeg')
const normalTextureUranus = textureLoader.load('./uranus.jpeg')
const normalTextureSaturnring = textureLoader.load('./Saturn ring.jpeg')

const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()



const Sungeometry = new THREE.SphereBufferGeometry(.9, 64, 64)
const Earthgeometry = new THREE.SphereBufferGeometry(.5, 64, 64)
const Mercurygeometry = new THREE.SphereBufferGeometry(.2, 64, 64)
const Venusgeometry = new THREE.SphereBufferGeometry(.5, 64, 64)
const Marsgeometry = new THREE.SphereBufferGeometry(.4, 64, 64)
const Jupitergeometry = new THREE.SphereBufferGeometry(.6, 64, 64)
const Saturngeometry = new THREE.SphereBufferGeometry(.4, 64, 64)
const Uranusgeometry = new THREE.SphereBufferGeometry(.45, 64, 64)
const Neptunegeometry = new THREE.SphereBufferGeometry(.4, 64, 64)
const Saturnringgeometry = new THREE.RingBufferGeometry(.5, .7, 60)

// Materials

const Earthmaterial = new THREE.MeshStandardMaterial()
Earthmaterial.roughness = 0.3
Earthmaterial.opacity = 0.9
Earthmaterial.map = normalTextureEarth;

const sphereEarth = new THREE.Mesh(Earthgeometry,Earthmaterial)

const Sunmaterial = new THREE.MeshStandardMaterial()
Sunmaterial.transparent = true
Sunmaterial.opacity = 0.9
Sunmaterial.metalness = 0
Sunmaterial.roughness = 0.3
Sunmaterial.map = normalTextureSUN;

Sunmaterial.color = new THREE.Color( 0xfff917 )

const Mercurymaterial = new THREE.MeshStandardMaterial()
Mercurymaterial.roughness = 0.3
Mercurymaterial.opacity = 0.9
Mercurymaterial.map = normalTextureMercury
const sphereMercury = new THREE.Mesh(Mercurygeometry,Mercurymaterial)

const Venusmaterial = new THREE.MeshStandardMaterial()
Venusmaterial.roughness = 0.3
Venusmaterial.opacity = 0.9
Venusmaterial.map = normalTextureVenus
const sphereVenus = new THREE.Mesh(Venusgeometry,Venusmaterial)

const Marsmaterial = new THREE.MeshStandardMaterial()
Marsmaterial.roughness = 0.3
Marsmaterial.opacity = 0.9
Marsmaterial.map = normalTextureMars
const sphereMars = new THREE.Mesh(Marsgeometry,Marsmaterial)

const Jupitermaterial = new THREE.MeshStandardMaterial()
Jupitermaterial.roughness = 0.3
Jupitermaterial.opacity = 0.9
Jupitermaterial.map = normalTextureJupiter
const sphereJupiter = new THREE.Mesh(Jupitergeometry,Jupitermaterial)

const Uranusmaterial = new THREE.MeshStandardMaterial()
Uranusmaterial.roughness = 0.3
Uranusmaterial.opacity = 0.9
Uranusmaterial.map = normalTextureUranus
const sphereUranus = new THREE.Mesh(Uranusgeometry,Uranusmaterial)

const Neptunematerial = new THREE.MeshStandardMaterial()
Neptunematerial.roughness = 0.3
Neptunematerial.opacity = 0.9
Neptunematerial.map = normalTextureNeptune
const sphereNeptune = new THREE.Mesh(Neptunegeometry,Neptunematerial)


const SaturnMaterial = new THREE.MeshStandardMaterial()
SaturnMaterial.opacity = 0.9
SaturnMaterial.roughness = 0.3
SaturnMaterial.map = normalTextureSaturn
const sphereSaturn = new THREE.Mesh(Saturngeometry,SaturnMaterial)


const SaturnringMaterial = new THREE.MeshBasicMaterial()
SaturnringMaterial.map = normalTextureSaturnring
const sphereSaturnring = new THREE.Mesh(Saturnringgeometry,SaturnringMaterial)


// Mesh
const sphere = new THREE.Mesh(Sungeometry,Sunmaterial)
scene.add(sphere)
scene.add(sphereEarth)
scene.add(sphereSaturn)
sphereSaturn.add(sphereSaturnring)
scene.add(sphereMercury)
scene.add(sphereVenus)
scene.add(sphereMars)
scene.add(sphereJupiter)
scene.add(sphereUranus)
scene.add(sphereNeptune)



const loader = new THREE.TextureLoader();
scene.background = loader.load('./stars.png' , function(texture)
            {
             scene.background = texture;  
            });


const pointLight = new THREE.PointLight(0xffffff, 2)
pointLight.position.x = 0
pointLight.position.y = 0
pointLight.position.z = 0
scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)



const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 10
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove(event) {

    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
}

const updateSphere = (event) => {
    sphereMercury.position.y = window.scrollY * .001
    sphereVenus.position.y = window.scrollY * .001
    sphereEarth.position.y = window.scrollY * .001
    sphereMars.position.y = window.scrollY * .001
    sphereJupiter.position.y = window.scrollY * .001
    sphereSaturn.position.y = window.scrollY * .001
    sphereUranus.position.y = window.scrollY * .001
    sphereNeptune.position.y = window.scrollY * .001
}

window.addEventListener('scroll', updateSphere);


const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001


    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.z = 0.5 * elapsedTime

    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    sphere.position.z += -.05 * (targetY - sphere.rotation.x)
            
    sphereEarth.rotation.z = 1.2 * elapsedTime
    sphereEarth.rotation.y += .05 * (targetX - sphereEarth.rotation.y)
    sphereEarth.rotation.x += .05 * (targetY - sphereEarth.rotation.x)
    sphereEarth.position.z += -.05 * (targetY - sphereEarth.rotation.x)
            
    sphereMercury.rotation.z = 1.2 * elapsedTime
    sphereMercury.rotation.y += .05 * (targetX - sphereEarth.rotation.y)
    sphereMercury.rotation.x += .05 * (targetY - sphereEarth.rotation.x)
    sphereMercury.position.z += -.05 * (targetY - sphereEarth.rotation.x)
            
    sphereVenus.rotation.z = 1.2 * elapsedTime
    sphereVenus.rotation.y += .05 * (targetX - sphereEarth.rotation.y)
    sphereVenus.rotation.x += .05 * (targetY - sphereEarth.rotation.x)
    sphereVenus.position.z += -.05 * (targetY - sphereEarth.rotation.x)
            
    sphereMars.rotation.z = 1.2 * elapsedTime
    sphereMars.rotation.y += .05 * (targetX - sphereEarth.rotation.y)
    sphereMars.rotation.x += .05 * (targetY - sphereEarth.rotation.x)
    sphereMars.position.z += -.05 * (targetY - sphereEarth.rotation.x)
            
    sphereJupiter.rotation.z = 1.2 * elapsedTime
    sphereJupiter.rotation.y += .05 * (targetX - sphereEarth.rotation.y)
    sphereJupiter.rotation.x += .05 * (targetY - sphereEarth.rotation.x)
    sphereJupiter.position.z += -.05 * (targetY - sphereEarth.rotation.x)
 
    sphereSaturn.rotation.z = 1.2 * elapsedTime
    sphereSaturn.rotation.y += .05 * (targetX - sphereEarth.rotation.y)
    sphereSaturn.rotation.x += .05 * (targetY - sphereEarth.rotation.x)
    sphereSaturn.position.z += -.05 * (targetY - sphereEarth.rotation.x)
            
    sphereUranus.rotation.z = 1.2 * elapsedTime
    sphereUranus.rotation.y += .05 * (targetX - sphereEarth.rotation.y)
    sphereUranus.rotation.x += .05 * (targetY - sphereEarth.rotation.x)
    sphereUranus.position.z += -.05 * (targetY - sphereEarth.rotation.x)
            
    sphereNeptune.rotation.z = 1.2 * elapsedTime
    sphereNeptune.rotation.y += .05 * (targetX - sphereEarth.rotation.y)
    sphereNeptune.rotation.x += .05 * (targetY - sphereEarth.rotation.x)
    sphereNeptune.position.z += -.05 * (targetY - sphereEarth.rotation.x)

    const rotMercury = Date.now() * 0.0009;
   
    sphereMercury.position.x = 2.5 * Math.cos(rotMercury)
    sphereMercury.position.y = 1.5 * Math.sin(rotMercury)

    const rotVenus = Date.now() * 0.0008;
   
    sphereVenus.position.x = 3.5 * Math.cos(rotVenus)
    sphereVenus.position.y = 2 * Math.sin(rotVenus)
            
   
    const rotEarth = Date.now() * 0.0007;

    sphereEarth.position.x = 5 * Math.cos(rotEarth)
    sphereEarth.position.y = 2.5 * Math.sin(rotEarth)

    const rotMars = Date.now() * 0.0006;
    
    sphereMars.position.x = 6 * Math.cos(rotMars)
    sphereMars.position.y = 3.6 * Math.sin(rotMars)

    const rotJupiter = Date.now() * 0.0005;
    
    sphereJupiter.position.x = 7 * Math.cos(rotJupiter)
    sphereJupiter.position.y = 4.3 * Math.sin(rotJupiter)

    const rotSaturn = Date.now() * 0.0004;
   
    sphereSaturn.position.x = 8 * Math.cos(rotSaturn)
    sphereSaturn.position.y = 5.5 * Math.sin(rotSaturn)

    const rotUranus = Date.now() * 0.0003;
  
    sphereUranus.position.x = 9 * Math.cos(rotUranus)
    sphereUranus.position.y = 6 * Math.sin(rotUranus)

    const rotNeptune = Date.now() * 0.0002;
    
    sphereNeptune.position.x = 9.7 * Math.cos(rotNeptune)
    sphereNeptune.position.y = 6.7 * Math.sin(rotNeptune)
    
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
