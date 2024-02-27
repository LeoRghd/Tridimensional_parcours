// Créer le système de particules
function getSmoke(scene, char) {
    let smokeSystem = new BABYLON.ParticleSystem('particles', 2000, scene)
    smokeSystem.particleTexture = new BABYLON.Texture(
        'utils/textures/smoke.png',
        scene
    )
    smokeSystem.emitter = char.player
    smokeSystem.minEmitBox = new BABYLON.Vector3(-0.1, 0, -0.1) // Zone d'émission minimale
    smokeSystem.maxEmitBox = new BABYLON.Vector3(0.1, 0, 0.1) // Zone d'émission maximale

    // Couleurs de la fumée
    smokeSystem.color1 = new BABYLON.Color4(0.1, 0.1, 0.1, 1.0)
    smokeSystem.color2 = new BABYLON.Color4(0.1, 0.1, 0.1, 1.0)
    smokeSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0.0)

    // Taille de la fumée
    smokeSystem.minSize = 0.3
    smokeSystem.maxSize = 1.5

    // Durée de vie de la fumée
    smokeSystem.minLifeTime = 0.5
    smokeSystem.maxLifeTime = 1

    // Vitesse de la fumée
    smokeSystem.emitRate = 500
    console.log('smokeSystem', smokeSystem)

    return smokeSystem
}
// Commencez le système de particules
