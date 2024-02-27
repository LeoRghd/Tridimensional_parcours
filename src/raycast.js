const handleHit = function (firstHit, secondHit) {
    if (firstHit && firstHit.pickedMesh.id === 'Ch36') {
        if (!secondHit) {
            firstHit = null
        } else if (secondHit.pickedMesh.id === 'touch') {
            firstHit = secondHit
            secondHit = null
        }
    } else if (
        firstHit &&
        firstHit.pickedMesh.id === 'touch' &&
        secondHit &&
        secondHit.pickedMesh.id === 'touch'
    ) {
        firstHit = secondHit
    }
    return firstHit
}

const raycast = function (player, camera, scene, previousRay, textTexture) {
    // Obtenez la position de la sphère enfant par rapport au personnage
    const cylinder = player.parent
    const crotch = cylinder.getChildren().find(function (element) {
        return element.name === 'crotch'
    })
    crotch.computeWorldMatrix(true)
    var spherePosition = crotch.getBoundingInfo().boundingBox.centerWorld

    // Obtenez la position de la caméra
    var cameraPosition = camera.position
    // Calculez la direction du rayon
    var direction = camera
        .getDirection(new BABYLON.Vector3(0, 0, 1))
        .normalize()
        .clone()

    // const spherePosition = spherePosition.add(direction.scale(crotch.radius * 1.1)) // ou ajustez le facteur de mise à l'échelle selon votre besoin

    var rayMaterial = new BABYLON.StandardMaterial('rayMaterial', scene)
    rayMaterial.emissiveColor = new BABYLON.Color3(1, 0, 0) // Rouge
    // Créez le rayon
    var ray = new BABYLON.Ray(spherePosition, direction)

    // Supprimez le rayon précédent s'il existe
    if (previousRay) {
        previousRay.dispose()
    }

    // Lancez le rayon
    let rayHelper = new BABYLON.RayHelper(ray)

    rayHelper.show(scene, new BABYLON.Color3(255, 0, 0))
    var pickResults = scene.multiPickWithRay(ray)

    var firstHit = null
    var secondHit = null
    for (var i = 0; i < pickResults.length; i++) {
        var pickResult = pickResults[i]

        if (pickResult.hit) {
            if (!firstHit) {
                firstHit = pickResult
            } else if (!secondHit) {
                secondHit = pickResult
                break // Sort de la boucle une fois que le deuxième hit est trouvé
            }
        }
    }
    var lastHit = handleHit(firstHit, secondHit)
    if (!lastHit) {
        textTexture = dynamicCrosshair(null, textTexture)
        previousRay = rayHelper
        return { previousRay, textTexture }
    }
    if (lastHit) {
        rayHelper.dispose()
        let rayHelper2 = new BABYLON.RayHelper(ray)
        rayHelper2.show(scene, new BABYLON.Color3(0, 255, 0))
        previousRay = rayHelper2
    }
    var hitPoint = lastHit.pickedPoint
    textTexture = dynamicCrosshair(lastHit.distance, textTexture)

    // Stockez le rayon actuel pour le supprimer à la prochaine frame
    return { previousRay, textTexture }
}
