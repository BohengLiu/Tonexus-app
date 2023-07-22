import * as THREE from 'three'
import { BLOOM_LAYER, STAR_MAX, STAR_MIN } from '../config/renderConfig'
import { starTypes } from '../config/starDistributions'
import { clamp } from '../utils'

let texture: THREE.Texture | null = null
let materials: THREE.SpriteMaterial[] | null = null

if (typeof window != 'undefined') {
    texture = new THREE.TextureLoader().load('/resources/sprite120.png')
    materials = starTypes.color.map((color) => new THREE.SpriteMaterial({map: texture, color: color}))
}

export class Star {
    position: THREE.Vector3
    starType: number
    obj: THREE.Sprite | null

    constructor(position: THREE.Vector3) {
        this.position = position
        this.starType = this.generateStarType()
        this.obj = null
    }

    generateStarType() {
        let num = Math.random() * 100.0
        let pct = starTypes.percentage
        for (let i = 0; i < pct.length; i++) {
            num -= pct[i]
            if (num < 0) {
                return i
            }
        }
        return 0
    }

    updateScale(camera: THREE.PerspectiveCamera) {
        let dist = this.position.distanceTo(camera.position) / 250

        // update star size
        let starSize = dist * starTypes.size[this.starType]
        starSize = clamp(starSize, STAR_MIN, STAR_MAX)
        this.obj?.scale.copy(new THREE.Vector3(starSize, starSize, starSize))
    }

    toThreeObject(scene: THREE.Scene) {
        if (materials) {
            let sprite = new THREE.Sprite(materials[this.starType])
            sprite.layers.set(BLOOM_LAYER)
            
            sprite.scale.multiplyScalar(starTypes.size[this.starType])
            sprite.position.copy(this.position)

            this.obj = sprite

            scene.add(sprite)
        }
    }
}