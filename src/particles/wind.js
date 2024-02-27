// Créer une texture pour les particules
function getWind(scene) {
    let windTexture = new BABYLON.Texture('textures/flare.png', scene)

    // Créer un système de particules
    let windSystem = new BABYLON.ParticleSystem('winds', 2000, scene)

    // Définir la texture des particules
    windSystem.windTexture = windTexture

    // Définir l'endroit où les particules sont émises
    windSystem.emitter = new BABYLON.Vector3(0, 0, 0) // les particules seront émises à partir de l'origine

    // Définir la direction dans laquelle les particules sont émises
    windSystem.direction1 = new BABYLON.Vector3(-1, 0, 0)
    windSystem.direction2 = new BABYLON.Vector3(-1, 0, 0)

    // Définir la taille des particules
    windSystem.minSize = 0.1
    windSystem.maxSize = 0.5

    // Définir la durée de vie des particules
    windSystem.minLifeTime = 0.3
    windSystem.maxLifeTime = 1.5

    // Définir la vitesse des particules
    windSystem.minEmitPower = 1
    windSystem.maxEmitPower = 3
    windSystem.updateSpeed = 0.005

    return windSystem
}
