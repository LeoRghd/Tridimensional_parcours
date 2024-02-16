function moveForward(char, camera, scene) {
    const runAnim = scene.getAnimationGroupByName('Run')
    let forward = getForwardVector(camera)
    let speed = 50

    if (char.isMoving) {
        runAnim.start(true, 1.0, runAnim.from, runAnim.to, false)
    }

    let movementDir = new BABYLON.Vector3(0, 0, 0)

    movementDir.addInPlace(forward)
    char.player.parent.lookAt(char.player.parent.position.add(forward), 0, 0, 0)
    applyMovementForce(char, movementDir, speed)

    return char
}

// Fonction pour gérer l'action lorsque la touche S est enfoncée
function moveBackward(char, camera, scene) {
    const runAnim = scene.getAnimationGroupByName('Run')
    let forward = getForwardVector(camera)
    let speed = 50

    if (char.isMoving) {
        runAnim.start(true, 1.0, runAnim.from, runAnim.to, false)
    }

    let movementDir = new BABYLON.Vector3(0, 0, 0)

    movementDir.subtractInPlace(forward)
    char.player.parent.lookAt(
        char.player.parent.position.add(
            new BABYLON.Vector3(-forward.x, 0, -forward.z)
        ),
        0,
        0,
        0
    )
    applyMovementForce(char, movementDir, speed)

    return char
}

// Fonction pour gérer l'action lorsque la touche Q est enfoncée
function moveLeft(char, camera, scene) {
    const runAnim = scene.getAnimationGroupByName('Run')
    let forward = getForwardVector(camera)
    let speed = 50

    if (char.isMoving) {
        runAnim.start(true, 1.0, runAnim.from, runAnim.to, false)
    }

    let movementDir = new BABYLON.Vector3(0, 0, 0)

    movementDir.addInPlace(BABYLON.Vector3.Cross(forward, BABYLON.Vector3.Up()))
    char.player.parent.lookAt(
        char.player.parent.position.add(forward),
        -Math.PI / 2
    )
    applyMovementForce(char, movementDir, speed)

    return char
}

// Fonction pour gérer l'action lorsque la touche D est enfoncée
function moveRight(char, camera, scene) {
    const runAnim = scene.getAnimationGroupByName('Run')
    let forward = getForwardVector(camera)
    let speed = 50

    if (char.isMoving) {
        runAnim.start(true, 1.0, runAnim.from, runAnim.to, false)
    }

    let movementDir = new BABYLON.Vector3(0, 0, 0)

    movementDir.subtractInPlace(
        BABYLON.Vector3.Cross(forward, BABYLON.Vector3.Up())
    )
    char.player.parent.lookAt(
        char.player.parent.position.add(forward),
        Math.PI / 2
    )
    applyMovementForce(char, movementDir, speed)

    return char
}

// Fonction pour gérer l'action lorsque la touche d'espace est enfoncée
function jump(char, camera, scene) {
    const jumpAnim = scene.getAnimationGroupByName('Jump')
    if (char.isOnGround && !char.isJumping) {
        char.isJumping = true
        char.jumpFrameCount = 0
    }

    return char
}
