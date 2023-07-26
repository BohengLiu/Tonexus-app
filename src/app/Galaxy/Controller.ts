import * as THREE from 'three'

// Data and visualization
import { CompositionShader} from './shaders/CompositionShader'
import { BASE_LAYER, BLOOM_LAYER, BLOOM_PARAMS, OVERLAY_LAYER } from "./config/renderConfig";

// Rendering
// import { MapControls } from 'three/addons/controls/MapControls.js'
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { Galaxy } from './objects/galaxy';


export class Controller {
  stop = false
  canvas: HTMLCanvasElement
  renderer: THREE.WebGLRenderer
  camera: THREE.PerspectiveCamera
  scene: THREE.Scene | null = null
  // orbit: MapControls
  baseComposer: EffectComposer
  bloomComposer: EffectComposer
  overlayComposer: EffectComposer
  galaxy: Galaxy
  rotationSpeed = 0.003;

  MIN_DISTANCE = 400
  distance = 50000;
  distanceDif = 0

  alpha = 0
  alphaDel = 0
  beta = 30
  betaDel = 0

  distanceSetFn: (() => number) | null = null
  
  constructor(_canvas: HTMLCanvasElement) {
    // grab canvas
    this.canvas = _canvas;

    // scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0xEBE2DB, 0.00003);

    // camera
    this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 5000000 );
    this.camera.position.set(0, 500, 500);
    this.camera.up.set(0, 0, 1);
    this.camera.lookAt(0, 0, 0);

    // map orbit
    // this.orbit = new OrbitControls(this.camera, this.canvas)
    // this.orbit.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    // this.orbit.dampingFactor = 0.05;
    // this.orbit.screenSpacePanning = false;
    // this.orbit.minDistance = 1;
    // this.orbit.maxDistance = 16384;
    // this.orbit.maxPolarAngle = (Math.PI / 2) - (Math.PI / 360)
    // this.orbit.autoRotate = true;

    // init render
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: _canvas,
      logarithmicDepthBuffer: true,
    })
    this.renderer.setPixelRatio( window.devicePixelRatio )
    this.renderer.setSize( window.innerWidth, window.innerHeight )
    this.renderer.outputEncoding = THREE.sRGBEncoding
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 0.5

    // General-use rendering pass for chaining
    const renderScene = new RenderPass( this.scene, this.camera )
    // Rendering pass for bloom
    const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 )
    bloomPass.threshold = BLOOM_PARAMS.bloomThreshold
    bloomPass.strength = BLOOM_PARAMS.bloomStrength
    bloomPass.radius = BLOOM_PARAMS.bloomRadius

    // bloom composer
    this.bloomComposer = new EffectComposer(this.renderer)
    this.bloomComposer.renderToScreen = false
    this.bloomComposer.addPass(renderScene)
    this.bloomComposer.addPass(bloomPass)

    // overlay composer
    this.overlayComposer = new EffectComposer(this.renderer)
    this.overlayComposer.renderToScreen = false
    this.overlayComposer.addPass(renderScene)

    // Shader pass to combine base layer, bloom, and overlay layers
    const finalPass = new ShaderPass(
      new THREE.ShaderMaterial( {
          uniforms: {
              baseTexture: { value: null },
              bloomTexture: { value: this.bloomComposer.renderTarget2.texture },
              overlayTexture: { value: this.overlayComposer.renderTarget2.texture }
          },
          vertexShader: CompositionShader.vertex,
          fragmentShader: CompositionShader.fragment,
          defines: {}
      } ), 'baseTexture'
    );
    finalPass.needsSwap = true;

    // base layer composer
    this.baseComposer = new EffectComposer( this.renderer )
    this.baseComposer.addPass( renderScene )
    this.baseComposer.addPass(finalPass)

    const axes = new THREE.AxesHelper(5.0)
    this.scene.add(axes)
    this.galaxy = new Galaxy(this.scene)
  }


  resizeRendererToDisplaySize() {
    const canvas = this.renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      this.renderer.setSize(width, height, false);
    }
    return needResize;
  }

  renderPipeline() {
    // Render bloom
    this.camera.layers.set(BLOOM_LAYER)
    this.bloomComposer.render()

    // Render overlays
    this.camera.layers.set(OVERLAY_LAYER)
    this.overlayComposer.render()

    // Render normal
    this.camera.layers.set(BASE_LAYER)
    this.baseComposer.render()
  }

  bindOnMouseMove() {
    window.document.addEventListener('mousemove', (e) => {
      this.onMouseMove(e)
    } , false);
  }

  onMouseMove = (event: any) => {
    // 计算鼠标的位置（范围从-1到1）
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    // 根据鼠标的位置调整alpha和beta的值
    this.alphaDel = mouseX * 5; // 你可以根据需要调整这个值
    this.betaDel = mouseY * 5; // 你可以根据需要调整这个值
  }

  getTargetPositon() {
    const z = this.distance * Math.sin((this.beta + this.betaDel) / 180 * Math.PI)
    const cast = this.distance * Math.cos((this.beta + this.betaDel) / 180 * Math.PI)
    const x = cast *  Math.sin((this.alpha + this.alphaDel) / 180 * Math.PI);
    const y = cast * Math.cos((this.alpha + this.alphaDel) / 180 * Math.PI)
    return {x, y, z}
  }

  render() {
    if (this.stop) {
      return
    }

    // this.orbit.update()

    if (this.distanceSetFn) {
      this.distance = Math.max(this.MIN_DISTANCE, this.distanceSetFn()) 
    }

    this.alpha = -this.rotationSpeed * Date.now()
    const {x, y, z} = this.getTargetPositon()

    // 更新摄像机位置
    this.camera.position.x = x;
    this.camera.position.y = y;
    this.camera.position.z = z;


    // 使摄像机始终面向原点
    this.camera.lookAt(0, 0, 0);

    // fix buffer size
    if (this.resizeRendererToDisplaySize()) {
      const canvas = this.renderer.domElement;
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      this.camera.updateProjectionMatrix();
    }

    // fix aspect ratio
    const canvas = this.renderer.domElement;
    this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
    this.camera.updateProjectionMatrix();

    this.galaxy.updateScale(this.camera)

    // Run each pass of the render pipeline
    this.renderPipeline()
    requestAnimationFrame(() => {
      this.render()
    })
  }

}
