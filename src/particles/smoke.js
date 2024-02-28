// Créer le système de particules
function getSmokes(scene, char) {
    let In = new BABYLON.ParticleSystem('particles', 2000, scene)
    In.particleTexture = new BABYLON.Texture('utils/textures/smoke.png', scene)
    In.emitter = char.player
    In.minEmitBox = new BABYLON.Vector3(-0.1, 0, -0.1) // Zone d'émission minimale
    In.maxEmitBox = new BABYLON.Vector3(0.1, 0, 0.1) // Zone d'émission maximale

    // Couleurs de la fumée
    In.color1 = new BABYLON.Color4(0.949, 0.047, 0.047)
    In.color2 = new BABYLON.Color4(0.949, 0.047, 0.047)
    In.colorDead = new BABYLON.Color4(0, 0, 0, 0.0)

    // Taille de la fumée
    In.minSize = 0.3
    In.maxSize = 1.5

    // Durée de vie de la fumée
    In.minLifeTime = 0.5
    In.maxLifeTime = 1

    // Vitesse de la fumée
    In.emitRate = 500
    console.log('In', In)

    let Out = new BABYLON.ParticleSystem('particles', 2000, scene)
    Out.particleTexture = new BABYLON.Texture('utils/textures/smoke.png', scene)
    Out.emitter = char.player
    Out.minEmitBox = new BABYLON.Vector3(-0.1, 0, -0.1) // Zone d'émission minimale
    Out.maxEmitBox = new BABYLON.Vector3(0.1, 0, 0.1) // Zone d'émission maximale

    // Couleurs de la fumée
    Out.color1 = new BABYLON.Color4(0.02, 0.98, 0.047)
    Out.color2 = new BABYLON.Color4(0.02, 0.98, 0.047)
    Out.colorDead = new BABYLON.Color4(0, 0, 0, 0.0)

    // Taille de la fumée
    Out.minSize = 0.3
    Out.maxSize = 1.5

    // Durée de vie de la fumée
    Out.minLifeTime = 0.5
    Out.maxLifeTime = 1

    // Vitesse de la fumée
    Out.emitRate = 500
    console.log('Out', Out)
    return { In, Out }
}
