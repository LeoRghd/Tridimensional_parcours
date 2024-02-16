counter = 0

//TODO : No bounce, no falling when walking

const getForwardVector = function (camera) {
    let cameraDirection = camera.getForwardRay().direction
    const forward = new BABYLON.Vector3(cameraDirection.x, 0, cameraDirection.z)
    forward.normalize()
    return forward
}
function updateJump(char) {
    const maxJumpFrames = 5 // Ajustez cette valeur selon vos besoins (correspond à environ 500 ms à 60 FPS)

    if (char.isJumping) {
        // Incrémenter le compteur de trames
        char.jumpFrameCount++

        // Si le compteur de trames dépasse la durée maximale du saut, arrêtez le saut
        if (char.jumpFrameCount >= maxJumpFrames) {
            char.isJumping = false
            return char
        }

        // Appliquer une impulsion de saut à chaque trame
        // const jumpForce = new BABYLON.Vector3(0, 10000, 0) // Ajustez la force du saut selon vos besoins
        let currentVelocity = char.playerAggregate.body.getLinearVelocity()

        // Ajouter une composante de saut à la vélocité actuelle
        currentVelocity.y += 5 // Ajustez la hauteur du saut selon vos besoins

        // Définir la nouvelle vélocité linéaire avec la composante de saut ajoutée
        char.playerAggregate.body.setLinearVelocity(currentVelocity)
    } else {
        // Réinitialiser le compteur de trames et le sautFrameCount lorsque le saut est terminé
        char.jumpFrameCount = 0
    }
    return char
}

function updateGravity(char) {
    // Si le personnage est en train de sauter, appliquer une force de gravité
    if (!char.isOnGround) {
        const gravity = new BABYLON.Vector3(0, -9.8, 0) // Ajustez la gravité selon vos besoins
        char.playerAggregate.body.applyForce(gravity)
    }
    return char
}

function updateGroundState(char, scene) {
    // Point de départ du raycast - légèrement au-dessus du personnage
    // Direction du raycast - vers le bas
    const cylinder = char.player.parent
    const feet = cylinder.getChildren().find(function (element) {
        return element.name === 'feet'
    })
    var spherePosition = feet.getAbsolutePosition().clone()
    const rayDirection = new BABYLON.Vector3(0, -1, 0)
    // Longueur du rayon
    const rayLength = 0.3 // Ajustez cette valeur en fonction de la hauteur de votre personnage au-dessus du sol

    // Créer le rayon
    const ray = new BABYLON.Ray(spherePosition, rayDirection, rayLength)
    // Visualiser le rayon pour le débogage (facultatif)
    if (char.groundRay) {
        char.groundRay.dispose()
    }
    let rayHelper = new BABYLON.RayHelper(ray)
    rayHelper.show(scene, new BABYLON.Color3(255, 0, 0))
    rayHelper.thickness = 0.05 // Augmentez l'épaisseur du rayon

    char.groundRay = rayHelper
    // Effectuer le raycast
    const hit = scene.pickWithRay(ray, (mesh) => {
        return mesh.isPickable && mesh.isEnabled() // Assurez-vous de tester uniquement les meshs qui sont pickables et activés
    })

    // Mettre à jour l'état au sol
    if (hit.hit && hit.pickedMesh) {
        // Le rayon a touché un mesh, le personnage est considéré comme étant au sol
        rayHelper.dispose()
        let rayHelper2 = new BABYLON.RayHelper(ray)
        rayHelper2.show(scene, new BABYLON.Color3(0, 255, 0))
        rayHelper2.thickness = 0.05 // Augmentez l'épaisseur du rayon

        char.groundRay = rayHelper2
        char.isOnGround = true
    } else {
        // Le rayon n'a touché aucun mesh, le personnage n'est pas au sol
        char.isOnGround = false
    }
    // console.log('char.player.position.y', char.playerAggregate)
    return char
}

const applyMovementForce = function (char, direction, speed) {
    let force = direction.scale(speed)
    let currentVelocity = char.playerAggregate.body.getLinearVelocity()
    currentVelocity.addInPlace(force)
    char.playerAggregate.body.setLinearVelocity(currentVelocity)
}

var handlePlayerMovement = function (keyStatus, scene, char, camera) {
    const runAnim = scene.getAnimationGroupByName('Run')
    const jumpAnim = scene.getAnimationGroupByName('Jump')
    const idleAnim = scene.getAnimationGroupByName('Idle')

    // Appeler les fonctions d'action appropriées en fonction des keyStatus
    if (keyStatus.z && char.isOnGround) {
        char = moveForward(char, camera, scene)
    }

    if (keyStatus.s && char.isOnGround) {
        char = moveBackward(char, camera, scene)
    }

    if (keyStatus.q && char.isOnGround) {
        char = moveLeft(char, camera, scene)
    }

    if (keyStatus.d && char.isOnGround) {
        char = moveRight(char, camera, scene)
    }

    if (keyStatus.space && char.isOnGround && !char.isJumping) {
        char = jump(char, camera, scene)
    }

    // Reste du code pour arrêter l'animation de course, etc.
    if (
        !keyStatus.z &&
        !keyStatus.s &&
        !keyStatus.q &&
        !keyStatus.d &&
        !keyStatus.space
    ) {
        char.isMoving = false
        runAnim.stop(true, 1.0, runAnim.to, runAnim.from, false)
    }

    return char
}
