import { BASE_LAYER, HAZE_MAX, HAZE_MIN, HAZE_OPACITY } from "../config/renderConfig"
import { clamp } from "../utils"
import * as THREE from 'three'

let hazeTexture: THREE.Texture | null = null
let hazeSprite: THREE.SpriteMaterial | null = null

if (typeof window != 'undefined') {
    hazeTexture = new THREE.TextureLoader().load('/resources/feathered60.png')
    hazeSprite = new THREE.SpriteMaterial({map: hazeTexture, color: 0xf0d5c9, opacity: HAZE_OPACITY, depthTest: false, depthWrite: false })
}

export class Haze {
    position: THREE.Vector3
    obj: THREE.Sprite | null

    constructor(position: THREE.Vector3) {
        this.position = position
        this.obj = null
    }

    updateScale(camera: THREE.PerspectiveCamera) {
        let dist = this.position.distanceTo(camera.position) / 250
        if (this.obj) {
            this.obj.material.opacity = clamp(HAZE_OPACITY * Math.pow(dist / 2.5, 2), 0, HAZE_OPACITY)
            this.obj.material.needsUpdate = true
        }
    }

    toThreeObject(scene: THREE.Scene) {
        if (hazeSprite) {
            let sprite = new THREE.Sprite(hazeSprite)
            sprite.layers.set(BASE_LAYER)
            sprite.position.copy(this.position)

            // varying size of dust clouds
            sprite.scale.multiplyScalar(clamp(HAZE_MAX * Math.random(), HAZE_MIN, HAZE_MAX))

            this.obj = sprite
            scene.add(sprite)
        }
    }
}