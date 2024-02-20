const startFallAnimationLoop = (char, scene, fallAnim) => {
    // Obtenez l'objet Animatable associé à votre personnage pour l'animation de chute
    const fallAnimatable = scene.beginAnimation(
        char,
        fallAnim,
        0,
        Number.MAX_VALUE,
        true
    )
}

function moveForward(char, camera, scene) {
    const runAnim = scene.getAnimationGroupByName('Run')
    let forward = getForwardVector(camera)
    let speed = 50

    if (char.isMoving && !char.isOnAir) {
        // console.log('char.isMoving', char.isMoving)
        // console.log('char.isOnGround', char.isOnGround)
        // console.log('char.isOnAir', char.isOnAir)
        // console.log('char.isFalling', char.isFalling)
        // console.log('char', char);
        
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
    if (char.isOnGround && !char.isJumping) {
        const jumpAnim = scene.getAnimationGroupByName('Jump')
        const fallAnim = scene.getAnimationGroupByName('Fall')
        const idleAnim = scene.getAnimationGroupByName('Idle')
        idleAnim.stop(false, 1.0, idleAnim.from, idleAnim.to, false)
        const jumpAnimatable = scene.beginAnimation(
            char,
            jumpAnim,
            0,
            Number.MAX_VALUE,
            false
        )
        jumpAnimatable.onAnimationEnd = startFallAnimationLoop(char, scene, fallAnim)
        jumpAnim.start(false, 2, jumpAnim.from, jumpAnim.to, false)
        char.isJumping = true
        char.isOnAir = true
        char.jumpFrameCount = 0
    }

    return char
}
